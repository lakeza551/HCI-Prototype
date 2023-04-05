const filledStarClass = 'fa-solid fa-star'
const blankStarClass = 'fa-regular fa-star'

const dayData = {
    meal: [
        {
            name: 'กะเพราไก่',
            time: 'มื้อเช้า',
            description: 'abc',
            ingredients: [
                'ไก่',
                'ข้าว',
                'กะเพรา'
            ]
        },
        {
            name: 'ไข่พะโล้',
            time: 'มื้อกลางวัน',
            description: 'def',
            ingredients: [
                'ไข่',
                'ข้าว',
            ]
        },
        {
            name: 'ข้าวต้มปลา',
            time: 'มื้อเย็น',
            description: 'hij',
            ingredients: [
                'ข้าว',
                'ปลา'
            ]
        }
    ],
    tickCount: 0
}

const data = [
    dayData,
    dayData,
    dayData,
    dayData,
    dayData,
    dayData,
    dayData
]

const grid = document.querySelector('.schedule-container')

for(const [dIndex, d] of data.entries()) {
    const box = document.createElement('div')
    var mealString = ''
    for(const m of d.meal) {
        mealString += `
        <div class="meal">
            <label>${m.time}:</label>
            <label for="">${m.name}</label>
            <input onclick="updateTick(event, this, ${dIndex})" type="checkbox">
        </div>
        `
    }
    box.setAttribute('onclick', `showMealInfo(${dIndex})`)
    box.className = 'day-box'
    box.innerHTML = `
    <div class="star-container">
    </div>
    <h1>วันที่ ${dIndex + 1}</h1>
    ${mealString}
    `
    drawStar(d.tickCount, box)
    grid.appendChild(box)
}

function drawStar(count, dayBoxElement) {
    const starContainerElement = dayBoxElement.querySelector('.star-container')
    starContainerElement.innerHTML = ''
    for(var i = 1; i <= 3; ++i) {
        const star = document.createElement('i')
        if(i <= count)
            star.className = filledStarClass
        else
            star.className = blankStarClass
        starContainerElement.appendChild(star)
    }
}

function updateTick(e, element, index) {
    e.stopPropagation()
    if(element.checked)
        data[index].tickCount ++
    else
        data[index].tickCount --
    const boxElement = document.querySelectorAll('.day-box')[index]
    drawStar(data[index].tickCount, boxElement)
}

function showMealInfo(index) {

    document.querySelector('.meal-info-backdrop').style.display = 'flex'
    const container = document.querySelector('.meal-info-container')
    container.innerHTML = `
    <button class="close-meal-info-button" onclick="closeMealInfo()">
        <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="center">
        <h1>วันที่ ${index + 1}</h1>
    </div>
    ${data[index].meal.map(m => {
        return `
        <div class="meal-info">
            <div class="meal-time">
                <h2>${m.time}: ${m.name}</h2>
                <i onclick="showDescription(this)" class="fa-sharp fa-regular fa-circle-down"></i>
            </div>
            <div class="meal-description" style="height: 0px;">
                <label for="">${m.description}</label>
            </div>
            <div class="meal-ingredient">
                ${m.ingredients.map(ing => {
                    return `<label>${ing}</label>`
                }).join('')}
            </div>
        </div>`
    }).join('')}
    `
}

function showDescription(element) {
    const box = element.parentNode.parentNode
    const descriptionElement = box.querySelector('.meal-description')
    //console.log(descriptionElement.style.height)
    if(descriptionElement.style.height === '0px') {
        element.style.transform = 'rotate(180deg)'
        descriptionElement.style.height = '30px'
    }
    else {
        element.style.transform = 'rotate(0deg)'
        descriptionElement.style.height = '0px'
    }
}

function closeMealInfo() {
    document.querySelector('.meal-info-backdrop').style.display = 'none'
}