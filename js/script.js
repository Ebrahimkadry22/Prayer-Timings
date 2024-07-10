

let cities = [
  {
    ar: 'دمياط',
    en: "Damietta",
  },
  {
    ar: 'دمياط الجديدة',
    en: "New Damietta",
  },
  {
    ar: 'كفر سعد',
    en: "Kafr Saad",
  },
  {
    ar:'سوهاج',
    en:'Sohag'
  },{
    ar:'المنصورة',
    en:'Mansoura'
  }

]
let paryerTime = [
  {
    ar: "الفجر",
    en: "Fajr",
  },
  {
    ar: "الظهر",
    en: "Dhuhr",
  },
  {
    ar: "العصر",
    en: "Asr",
  },
  {
    ar: "المغرب",
    en: "Sunset",
  },
  {
    ar: "العشاء",
    en: "Isha",
  },

]

document.getElementById('cities').addEventListener('change', function () {
  let cityName = ""
  for(city of cities) {
    if(city.en == this.value) {
      cityName = city.en
      document.getElementById('cityName').innerHTML = city.ar
    }
  }
  getApi(cityName)
})


function getApi (city) {
  let params = {
    country: "EG",
    city: city
  };
  axios.get('http://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
    .then(function (response) {
      // handle success
      console.log(response.data.data.timings);
      let timings = response.data.data.timings;
      document.getElementById('cards').innerHTML = "";
      for (let paryer of paryerTime) {
        for (let name in timings) {
          if (paryer.en == name) {
            const content = `
                <div class="card">
                  <div class="header__card">
                    <h1>${paryer.ar}</h1>
                  </div>
                  <div class="body__card">
                    <h1 class="time">${updataTime(timings[paryer.en])} </h1>
                  </div>
                </div>
                `;
            document.getElementById('cards').innerHTML += content;
  
          }
        }
  
      }
      const readableMonth = response.data.data.date.hijri.month.ar;
      const readableYear = response.data.data.date.hijri.year;
      const readableDay = response.data.data.date.hijri.day;
      const readableWeekday = response.data.data.date.hijri.weekday.ar;
      const date = readableWeekday + "  " + readableDay + "  " + readableMonth + "  " + readableYear;
      document.getElementById('date').innerHTML = date
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

getApi('Damietta')





for (let city of cities) {
  const content = `
  <option value='${city.en}'>${city.ar}</option>
  `
  document.getElementById('cities').innerHTML += content;
}


function updataTime(time) {
  for (let i = 0; time <= time; i++) {
    let clock = String(Number(time[0] + time[1]) - 2);
    if (time[0] == 0  || Number(time[0] + time[1]) <= 12) {
      return time[0] + time[1] + ":" + time[3] + time[4]
    }
    return clock[1] + ":" + time[3] + time[4]


  }
}


