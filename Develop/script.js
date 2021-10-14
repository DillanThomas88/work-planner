const currentday = document.querySelector('#currentDay')
const formcontrol = document.querySelectorAll('.form-control')
const morning = document.querySelector('.morning')
const evening = document.querySelector('.evening')


function SetCurrentTime(){
    var time = setInterval(function(){
        var currenttime = moment().format('LT'); 
        // console.log(currenttime)
        currentday.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
    },10)
}
SetCurrentTime()

function Save(event){    
    var element = event.target.parentNode.parentNode
    var id = element.children[1].getAttribute('data-index')
    var textValue = element.children[1]
    var img = element.children[2].children[0].children[0]
    if(textValue.value.length > 0) {
        img.setAttribute('src','../Assets/check.svg')
        document.querySelector('#'+ id).disabled = true
        var data = {
            disabled: true,
            text: textValue.value,
        }    
        localStorage.setItem(id,JSON.stringify(data))
        event.target.removeEventListener('click', Save)
        event.target.addEventListener('click', Delete)
    } else {
        textValue.setAttribute('placeholder','Saved Nothing')
        textValue.style.backgroundColor = '#fff3f3'
        var buffer = setInterval(function(){
            textValue.setAttribute('placeholder','Open')
            textValue.style.backgroundColor = '#fff'
            clearInterval(buffer)

        },1000)
    }
}
function Delete(event){
    var element = event.target.parentNode.parentNode
    var id = element.children[1].getAttribute('data-index')
    var textValue = element.children[1]
    var img = element.children[2].children[0].children[0]
    var change = JSON.parse(localStorage.getItem(id))
    textValue.value = ''
    change.disabled = false
    change.text = textValue.value
    img.setAttribute('src','../Assets/add.svg')
    document.querySelector('#'+ id).disabled = false
    localStorage.setItem(id,JSON.stringify(change))

    event.target.removeEventListener('click', Delete)
    event.target.addEventListener('click', Save)
}

function FetchData(x){
    for (let q = 0; q < 10; q++) {
        var data = JSON.parse(localStorage.getItem(x + q))
        var textElement = document.querySelector('#'+ x + q )
        if(data == null) {
            textElement.value = ""
            textElement.parentNode.children[2].children[0].children[0].setAttribute('src','../Assets/add.svg')
        } else {
            if(data.disabled == true){
                textElement.disabled = true
                textElement.parentNode.children[2].children[0].children[0].setAttribute('src','../Assets/check.svg')
                textElement.parentNode.children[2].children[0].removeEventListener('click', Save)
                textElement.parentNode.children[2].children[0].addEventListener('click', Delete)
            } else {
                textElement.disabled = false
                textElement.parentNode.children[2].children[0].children[0].setAttribute('src','../Assets/add.svg')
            }
            
            textElement.value = data.text
        }
    }
}

CreateList(morning, 'm')
CreateList(evening, 'e')
FetchData('m')
FetchData('e')
function CreateList(x, y){
    var int
    var ampm
    if(y == "m"){int = 6; ampm = "AM"} else {int = 11; ampm = "PM"}
    for (let i = 0; i < 10; i++) {
        var parity
        if(i%2 === 0){parity = '00'; int++} else { parity = '30'}
        if(int > 12){int = int - 12}

        var div = document.createElement('div')
        var span1 = document.createElement('span')
        var input = document.createElement('input')
        var span2 = document.createElement('span')
        var btn = document.createElement('button')
        var img = document.createElement('img')

        div.setAttribute('class', 'input-group', 'flex-nowrap')
        div.setAttribute('style','width:100%')
        
        span1.setAttribute('class', 'input-group-text')
        span1.setAttribute('id','addon-wrapping')
        span1.setAttribute('style','width:15%')
        span1.textContent = int + ':' + parity + " " + ampm
        div.appendChild(span1)
        
        input.setAttribute('type','text')
        input.setAttribute('class','form-control')
        input.setAttribute('placeholder','Open')
        input.setAttribute('aria-label','open')
        input.setAttribute('data-index',y + i)        
        input.setAttribute('aria-describedby','addon-wrapping')
        input.setAttribute('id',y + i)
        div.appendChild(input)
        
        span2.setAttribute('class','input-group-text','d-flex','justify-content-center')
        span2.setAttribute('id','addon-wrapping')
        span2.setAttribute('style','width: 6%; padding:0%')
        div.appendChild(span2)  
        
        btn.setAttribute('class','btn')
        btn.setAttribute('style','width: 100%; height: 100%')
        btn.addEventListener('click', Save)
        div.appendChild(btn)
        span2.appendChild(btn)
        
        img.setAttribute('src', '../Assets/add.svg')
        img.setAttribute('alt','save schedule')
        img.setAttribute('style','width: 100%')
        div.appendChild(img)
        span2.appendChild(img)
        btn.appendChild(img)  
        
        x.appendChild(div) 
    }
    
    
}



{/* <div class="input-group flex-nowrap">
            <span class="input-group-text " id="addon-wrapping">12:00pm</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
              aria-describedby="addon-wrapping">
            <span class="save input-group-text d-flex justify-content-center " id="addon-wrapping"> <img
                src="../Assets/add.svg" alt=""></span>
          </div> */}