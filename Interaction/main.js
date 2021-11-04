/* 이미지 div .graphic-item에 data-index = "0~~" 번호를 붙여줌
  텍스트 div .step에도 같이 붙여줘서 화면에 보일것은 opacity로 조절해준다*/

(() => {
    //객체로 가져오기
    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    
    //인덱스 넣어서 이미지와 텍스트 서로 쌍을 맞출 수 있게

    for( let i = 0; i< stepElems.length; i++) {
      //stepElems[i].setAttribute('data-index', i); //방법1
      stepElems[i].dataset.index = i; //방법2
      graphicElems[i].dataset.index = i;
    }

    //화면에 어떤 객체가 올라왔는지 체크하기
    window.addEventListener('scroll',() =>{
        let step;
        let boundingRect;

        for (let i = 0; i < stepElems.length; i++) {
            step = stepElems[i];
            boundingRect = step.getBoundingClientRect();
            //console.log(boundingRect);//박스의 위치와 크기가 나옴
            //console.log(boundingRect.top);


            // 윈도우 창 크기 기준으로 위에서 10퍼 아래, 아래에서 20퍼위로 사이 일때 -조건
            // 텍스트가 범위안에 들어오는지 확인
            if(boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8) {
                    console.log(step.dataset.index);
            }
        }
    });


}) (); //익명함수 즉시 실행 (지역변수로 만들기 위함)