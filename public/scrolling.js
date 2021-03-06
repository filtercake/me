
function scrollNext(element,finalValue,stepsRemaining,totalSteps,intervalSize) {
  element.scrollTop = finalValue - (finalValue - element.scrollTop) * stepsRemaining / totalSteps;
  if (stepsRemaining > 0) {
    setTimeout(function() { 
      scrollNext(element,finalValue,stepsRemaining-1,totalSteps,intervalSize)
    }, intervalSize);
  }
}

function animateScrollToTarget(element,target,duration) {
  var scrollToValue = target.offsetParent.offsetTop + target.offsetTop;
  var steps = Math.abs(Math.round((scrollToValue - element.scrollTop) / 20));
  if (steps > 50) { steps = 50; }
  scrollNext(element,scrollToValue,steps-1,steps,duration/steps);
}

window.onload = function() {
  var element = document.body
  var target = document.getElementById("_" + window.location.hash.slice(1));
  if (target) { setTimeout(function() { animateScrollToTarget(element,target,100); }, 500); }
  var links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      var target = document.getElementById("_" + this.hash.slice(1));
      animateScrollToTarget(element,target,500);
    }, {passive: true});
  };
};
