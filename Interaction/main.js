/* 이미지 div .graphic-item에 data-index = "0~~" 번호를 붙여줌
  텍스트 div .step에도 같이 붙여줘서 화면에 보일것은 opacity로 조절해준다*/

(() => {
    //객체로 가져오기
  //새 애니메이션을 위한 새 함수 받아오기
    const actions = {
      birdFlies(key){
        if (key) {
          //부모인자를 활용한 셀렉트
          document.querySelector('[data-index="2"] .bird').style.transform = 
          `translateX(${window.innerWidth}px)`; //윈도우만큼 이동
        } else {
          document.querySelector('[data-index="2"] .bird').style.transform = 
          `translateX(-100%)`; //윈도우만큼 이동
        }
      },

      birdFlies2(key){
        if (key) {
          document.querySelector('[data-index="5"] .bird').style.transform = 
          `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`; //윈도우만큼 이동
        } else {
          document.querySelector('[data-index="5"] .bird').style.transform = 
          `translateX(-100%)`; //윈도우만큼 이동
        }
      }

    }


    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    // 현재 활성화된 visible 클래스 .graphic-item을 지정
    let curruntItem = graphicElems[0]; 
    let ioIndex;
    //인덱스 넣어서 이미지와 텍스트 서로 쌍을 맞출 수 있게

    const io = new IntersectionObserver((entries, observer) => {
      ioIndex = entries[0].target.dataset.index * 1;
      
      //entries[0]인 이유는 이전에 array에서 0이 나왔기 때문(1밖에 출력이 안됬음)
    });

    for( let i = 0; i< stepElems.length; i++) {
      io.observe(stepElems[i]);
      //stepElems[i].setAttribute('data-index', i); //방법1
      stepElems[i].dataset.index = i; //방법2
      graphicElems[i].dataset.index = i;
    }

    function activate(action){
      curruntItem.classList.add('visible'); //객체 호출
      if (action) {
        actions[action](true); //객체 호출
      }
    }

    function inactivate(action){
      curruntItem.classList.remove('visible');
      if (action) {
        actions[action](false);
      }
    }

    activate();
    //화면에 어떤 객체가 올라왔는지 체크하기
    window.addEventListener('scroll',() =>{
        let step;
        let boundingRect;

        //for (let i = 0; i < stepElems.length; i++) {
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) { //전과 다음거
            step = stepElems[i];
            
            if (!step) continue; //컨티뉴로 패스하기
            
            boundingRect = step.getBoundingClientRect(); // 에러 . ioIndex처음에 -1 하면 존재하지 않는 값을 말하기 때문에.
            //console.log(boundingRect);//박스의 위치와 크기가 나옴
            //console.log(boundingRect.top);

           

            // 윈도우 창 크기 기준으로 위에서 10퍼 아래, 아래에서 20퍼위로 사이 일때 -조건
            // 텍스트가 범위안에 들어오는지 확인
            if(boundingRect.top > window.innerHeight * 0.1 && 
                boundingRect.top < window.innerHeight * 0.8) {
                    //console.log(step.dataset.index);
                    //graphicElems[step.dataset.index].classList.add('visible'); //visible 클래스를 붙인다.

                    //변수에 담아서 활용
                    //curruntItem.classList.remove('visible');//  처음에는 currentItem값이 없어서 에러남 , 그리고 혹시 있을 경우 초기화 시켜줌

                    
                    
                    inactivate(); 
                    curruntItem =  graphicElems[step.dataset.index];
                    activate(curruntItem.dataset.action);
            }
        }

       
    });


}) (); //익명함수 즉시 실행 (지역변수로 만들기 위함)