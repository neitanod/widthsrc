function widthSrcRunOnce(func, scope){
  if(typeof(scope) == 'undefined') scope = this;
  var done = false;
  return function(){
    if(!done){
      done = true;
      return func.apply(scope, arguments);
    }
  }
}

jQuery.fn.widthSrc = function(options){
  options.thresholds.push(0);
  options.thresholds.sort(function(a,b){return parseFloat(b) - parseFloat(a); });
  console.log(options.thresholds);

  var elms = jQuery(this);
  elms.each(
    function(i){
      var that = this;
      var $that = $(this);
      var lastThreshold = "";
      that.maxLoaded = -1;
    

      //hard load initial image, just in case enquire does not work
      var selectedThreshold = 0;
      jQuery.each(options.thresholds, function(i){
        if(this < $(window).width() && this > selectedThreshold && $that.data("src-"+this)) {
          selectedThreshold = this; 
        }
      });
      console.log("selectedThreshold: "+selectedThreshold);
      //preloading selected src
      $that.attr("src", $that.data("src-"+selectedThreshold));
      console.log( $that.data("src-"+selectedThreshold));
      
      if(/MSIE 10/.test(navigator.userAgent)){
        return;
      }
      jQuery.each(options.thresholds, function(i){
        if(this == lastThreshold) return;  //duplicate number, already processed
        var threshold = this;
        if($that.data("src-"+threshold)){
          try{
            enquire.register("screen and (min-width: "+ threshold +"px)"+ 
                            (lastThreshold != ""? " and (max-width: "+(lastThreshold-1)+"px)"  :""), {
              match: widthSrcRunOnce(function(){ 
                      //console.log("maxLoaded: "+ that.maxLoaded); 
                      if(that.maxLoaded < threshold) {
                        //console.log("Loading: "+ $that.data("src-"+threshold)); 
                        //create new img element, load image, only apply when fully loaded
                        $('<img>').attr("src", $that.data("src-"+threshold)).one("load", function(){
                          var elminwidth = $that.css('min-width');
                          var elminheight = $that.css('min-height');
                          $that
                          .css({'min-width': $that.width()+"px", 'min-height': $that.height()+"px"})
                          .css({'background-image': 'url('+$that.attr('src')+')'})
                          .attr("src",$that.data("src-"+threshold))
                          .css({'min-width': elminwidth, 'min-height': elminheight});
                          that.maxLoaded = threshold;
                        });
                      }
                    }),
            });
          } catch(err) { /* do not abort on error */ }
          lastThreshold = threshold;
        }
      });
    });
  return elms;
}
