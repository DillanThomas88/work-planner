const currentday = document.querySelector('#currentDay')
const formcontrol = document.querySelectorAll('.form-control')
const morning = document.querySelector('.morning')
const evening = document.querySelector('.evening')
const add = './assets2/images/add.svg'
const remove = './assets2/images/remove.svg'
const done = './assets2/images/done.svg'
const colorPast = '#e7eaf0'
const colorPresent = '#fae5a0'
const colorFuture = '#d5e0f6'
var timecheck = []


function SetCurrentTime() {
    var currenttime = moment().format('LT');
    currentday.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');

    for (let i = 0; i < timecheck.length; i++) {
        const index = timecheck[i];
        const nextIndex = timecheck[i + 1]
        var now = moment('2:00pm', 'h:mma')
        var time = moment(index, 'h:mma')
        var nexttime = moment(nextIndex, 'h:mma')
        var parent = document.getElementById(index)
        if (moment().isBefore(time)) {
            parent.children[0].style.backgroundColor = colorFuture
            parent.children[2].style.backgroundColor = colorFuture


        } else if (moment().isSameOrAfter(time) && moment().isBefore(nexttime)) {
            parent.children[0].style.backgroundColor = colorPresent
            parent.children[2].style.backgroundColor = colorPresent
            parent.children[2].children[0].children[0].setAttribute('src', done)
            parent.children[1].disabled = true
            parent.children[1].setAttribute('placeholder','In Progress..')
            parent.children[2].children[0].disabled = true

        } else {
            parent.children[0].style.backgroundColor = colorPast
            parent.children[2].style.backgroundColor = colorPast
            parent.children[2].children[0].children[0].setAttribute('src', done)
            parent.children[1].disabled = true
            parent.children[1].setAttribute('placeholder','Closed')
            parent.children[2].children[0].disabled = true
        }


    }
    var time = setInterval(function () {
        SetCurrentTime()
        clearInterval(time)
    }, 1000)
}


function Save(event) {
    var element = event.target.parentNode.parentNode
    var id = element.children[1].getAttribute('data-index')
    var textValue = element.children[1]
    var img = element.children[2].children[0].children[0]
    if (textValue.value.length > 0) {
        img.setAttribute('src', remove)
        document.querySelector('#' + id).disabled = true
        var data = {
            disabled: true,
            text: textValue.value,
        }
        localStorage.setItem(id, JSON.stringify(data))
        event.target.removeEventListener('click', Save)
        event.target.addEventListener('click', Delete)
    } else {
        textValue.setAttribute('placeholder', 'Saved Nothing')
        textValue.style.backgroundColor = '#fff3f3'
        var buffer = setInterval(function () {
            textValue.setAttribute('placeholder', 'Open')
            textValue.style.backgroundColor = '#fff'
            clearInterval(buffer)

        }, 1000)
    }
}
function Delete(event) {
    var element = event.target.parentNode.parentNode
    var id = element.children[1].getAttribute('data-index')
    var textValue = element.children[1]
    var img = element.children[2].children[0].children[0]
    var change = JSON.parse(localStorage.getItem(id))
    textValue.value = ''
    change.disabled = false
    change.text = textValue.value
    img.setAttribute('src', add)
    document.querySelector('#' + id).disabled = false
    localStorage.setItem(id, JSON.stringify(change))

    event.target.removeEventListener('click', Delete)
    event.target.addEventListener('click', Save)
}

function FetchData(x) {
    for (let q = 0; q < 10; q++) {
        var data = JSON.parse(localStorage.getItem(x + q))
        var textElement = document.querySelector('#' + x + q)
        if (data == null) {
            textElement.value = ""
            textElement.parentNode.children[2].children[0].children[0].setAttribute('src', add)
        } else {
            if (data.disabled == true) {
                textElement.disabled = true
                textElement.parentNode.children[2].children[0].children[0].setAttribute('src', remove)
                textElement.parentNode.children[2].children[0].removeEventListener('click', Save)
                textElement.parentNode.children[2].children[0].addEventListener('click', Delete)
            } else {
                textElement.disabled = false
                textElement.parentNode.children[2].children[0].children[0].setAttribute('src', add)
            }

            textElement.value = data.text
        }
    }
}
CreateList(morning, 'm')
CreateList(evening, 'e')
FetchData('m')
FetchData('e')
SetCurrentTime()

function CreateList(m, e) {
    var int
    var ampm
    if (e == "m") { int = 6; ampm = "am" } else { int = 11; ampm = "pm" }
    for (let i = 0; i < 10; i++) {
        var parity
        if (i % 2 === 0) { parity = '00'; int++ } else { parity = '30' }
        if (int > 12) { int = int - 12 }

        var div = document.createElement('div')
        var span1 = document.createElement('span')
        var input = document.createElement('input')
        var span2 = document.createElement('span')
        var btn = document.createElement('button')
        var img = document.createElement('img')

        div.setAttribute('class', 'input-group', 'flex-nowrap')
        div.setAttribute('style', 'width:100%')
        div.setAttribute('id', int + ':' + parity + ampm)
        span1.setAttribute('class', 'input-group-text')
        span1.setAttribute('id', 'addon-wrapping')
        span1.setAttribute('style', 'width:175px')
        span1.textContent = int + ':' + parity + ampm
        div.appendChild(span1)
        timecheck = timecheck.concat(span1.textContent)

        input.setAttribute('type', 'text')
        input.setAttribute('class', 'form-control')
        input.setAttribute('placeholder', 'Open')
        input.setAttribute('aria-label', 'open')
        input.setAttribute('data-index', e + i)
        input.setAttribute('aria-describedby', 'addon-wrapping')
        input.setAttribute('id', e + i)
        div.appendChild(input)

        span2.setAttribute('class', 'input-group-text', 'd-flex', 'justify-content-center')
        span2.setAttribute('id', 'addon-wrapping')
        span2.setAttribute('style', 'width: 6%; padding:0%')
        div.appendChild(span2)

        btn.setAttribute('class', 'btn')
        btn.setAttribute('style', 'width: 100%; height: 100%')
        btn.addEventListener('click', Save)
        div.appendChild(btn)
        span2.appendChild(btn)

        img.setAttribute('src', add)
        img.setAttribute('alt', 'save schedule')
        img.setAttribute('style', 'width: 80%')
        div.appendChild(img)
        span2.appendChild(img)
        btn.appendChild(img)

        m.appendChild(div)
    }

}



// {/* <div class="input-group flex-nowrap">
//             <span class="input-group-text " id="addon-wrapping">12:00pm</span>
//             <input type="text" class="form-control" placeholder="Username" aria-label="Username"
//               aria-describedby="addon-wrapping">
//             <span class="save input-group-text d-flex justify-content-center " id="addon-wrapping"> <img
//                 src="../Assets/add.svg" alt=""></span>
//           </div> */}