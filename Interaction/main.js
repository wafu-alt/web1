(() => {

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');

  for ( let i =0; i< stepElems.length; i++){
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    for (let i =0; i < stepElems.length; i++){
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();
      console.log(boundingRect);
    }
  });

})();