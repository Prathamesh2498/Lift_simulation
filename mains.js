let buttonSimulate = document.querySelector('.buttonsimulate');
let backToPageOne = document.querySelector('.backtopageone');
backToPageOne.addEventListener('click', hidePageTwo);

buttonSimulate.addEventListener('click', initialcheck);

function hidePageTwo() {
    document.querySelector('.pagetwo').style.display = 'none';
    document.querySelector('.pageone').style.display = 'flex';

    deleteFloors();

}

function initialcheck(){
    let floorcount = document.querySelector('#floorNumber').value;
    let liftcount = document.querySelector('#liftNumber').value;

    if(floorcount=='' || liftcount==''){
        alert("please enter value");
    }
    else if(floorcount<1 || floorcount>7){
        alert('please enter floor value between 1 to 7');
    }
    else if(liftcount<1 || liftcount>5){
        alert('please enter lift value between 1 to 5');
    }
    else if(liftcount>floorcount){
        alert("Lift number must not be greater than floor number")
    }

    else{
    document.querySelector('.pageone').style.display ='none';
    document.querySelector('.pagetwo').style.display ='block';
    document.querySelector('.backtopageone').removeAttribute('hidden');
    createFloors();
    
    }

}

function createFloors(){

    // document.querySelector('.pageone').style.display ='none';
    // document.querySelector('.pagetwo').style.display ='block';
    // document.querySelector('.backtopageone').removeAttribute('hidden');
    
    let floor = document.querySelector('#floorNumber').value;
    let liftno = document.querySelector('#liftNumber').value;

    for(let i = floor; i >0 ;i--){

    let maindiv = document.createElement('div');
    maindiv.className='main';
    let subdiv = document.createElement('div');
    subdiv.className='subdiv';
    let buttondiv = document.createElement('div');
    buttondiv.className='buttondiv';
 
    let button1 = document.createElement('button');
    button1.className='button1';
    let text1 = document.createTextNode("⬆");
    button1.appendChild(text1);
    let button2 = document.createElement('button');
    button2.className='button2';
    let text2 = document.createTextNode("⬇");
    button2.appendChild(text2);

    buttondiv.appendChild(button1);
    buttondiv.appendChild(button2);
    subdiv.appendChild(buttondiv);
    maindiv.appendChild(subdiv);

    let hrdiv = document.createElement('div');
    hrdiv.className = 'hrdiv';

    let hr = document.createElement('hr');

    let span = document.createElement('span');
    span.innerText = `Floor ${i}`;
    hrdiv.appendChild(hr);
    hrdiv.appendChild(span);
    maindiv.appendChild(hrdiv);

    document.querySelector('.pagetwo').appendChild(maindiv);
         
/*  <div class="main">
        <div class="subdiv">
            <div class="buttondiv">
                <button class="button1" id="up1">Up</button>
                <button class="button2" id="down1">Down</button>
            </div>
            <div class="liftdiv">
                <div class="lift" id="lift1" flag="free">
                    <div class="gates" id="gates">
                    <div class="gate1"></div>
                    <div class="gate2"></div>
                </div>
            <div>
        </div>
        </div>
        <div class="hrdiv">
            <hr>
            <span>Floor</span>
        </div>
    </div> */

    }
        let mainLift = document.createElement('div');
        mainLift.className = 'liftdiv';
    
        for (let j = liftno; j > 0; j--) {
    
            let lift = document.createElement('div');
            lift.className = 'lift';
            lift.setAttribute('id', `lift${j}`);
    
            lift.setAttribute('flag', `free`);
    
            let gates = document.createElement('div');
            gates.className = 'gates';
            gates.setAttribute('id', `gates`);
    
            let gate1 = document.createElement('div');
            gate1.className = 'gate1';
            gates.appendChild(gate1);
    
            let gate2 = document.createElement('div');
            gate2.className = 'gate2';
            gates.appendChild(gate2);
            lift.appendChild(gates);
            mainLift.appendChild(lift);
        }
        
    const buttonLiftMain = document.querySelectorAll('.subdiv');
    const lastbox = buttonLiftMain[buttonLiftMain.length - 1];
    lastbox.appendChild(mainLift);
    let selectAllLift = document.querySelectorAll('.lift');
    let up = document.querySelectorAll('.button1');
    let down = document.querySelectorAll('.button2');
    let temp = up.length;
        
    let arrFloorVal=[];

    for(let i=0;i<selectAllLift.length;i++){
        arrFloorVal.push(1)
    }
    
    up.forEach((e, i) => {
        e.addEventListener('click', () => {            
            let floorval = temp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                                
                if (selectAllLift[i].getAttribute('flag') === 'free') {
                    
                    selectAllLift[i].setAttribute('flag', 'busy');

                    moveLift(selectAllLift[i], floorval,arrFloorVal[i]);
                    arrFloorVal[i]=floorval;
                                        
                    break;
                }
            }
        })
    })
 
    down.forEach((e, i) => {
        e.addEventListener('click', () => {
            let floorval = temp - i;
            for (let i = 0; i < selectAllLift.length; i++) {
                
                if (selectAllLift[i].getAttribute('flag') === 'free') {

                    selectAllLift[i].setAttribute('flag', 'busy');

                    moveLift(selectAllLift[i], floorval,arrFloorVal[i]);
                    arrFloorVal[i]=floorval;
                                       
                    break;
                }
            }
        })
    })


}

function moveLift(liftno, floorNo,oldFloorValue) {
   
    liftno.style.transform = `translateY(${-95 * (floorNo - 1)}px)`;//95 pixels 
    
    let prev= `${2 * Math.abs(floorNo - oldFloorValue)}s`//multiplied by 2
    liftno.style.transitionDuration = prev; //time

    setTimeout(() => {

        gateopenclose(liftno);
        setTimeout(() =>{
            liftno.setAttribute('flag', 'free')
        },5500);
    }, 2 * Math.abs(floorNo - oldFloorValue) * 1000)
}

function gateopenclose(liftno) {
    let gates=liftno.firstChild; 
    let gate1 = document.querySelector('.gate1');
    let gate2 = document.querySelector('.gate2');
  
    setTimeout(() => {

        gates.children[0].style.width = '7px';
        gates.children[1].style.width = '7px';
    }, 1000);

    
    setTimeout(() => {
        gates.children[0].style.width = '25px';
        gates.children[1].style.width = '25px';
    }, 3500)

}


function deleteFloors(){
    let inputOfFloors = document.querySelector('#floorNumber').value;
    for(let i= inputOfFloors; i>0; i-- ){

    let maindiv = document.querySelector('.main');
    maindiv.remove();
    }
}