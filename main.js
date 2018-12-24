
(function expandAndCollapseText() {

    let buttons = document.getElementsByClassName('moreOrLessButton');
    for (let button of buttons) {
        button.addEventListener('click', function() {

            let year = button.id.substr(0, 4);
            let el = document.getElementsByClassName(year + 'Text')[0];

            if (button.id === year + 'More') {
                document.getElementById(button.id.replace('More', 'Less')).style.visibility = 'visible';
                el.classList.remove('collapsed');
                el.style.maxHeight = el.scrollHeight + 'px';
                el.style.opacity = '1';
            } else {
                document.getElementById(button.id.replace('Less', 'More')).style.visibility = 'visible';
                el.classList.add('collapsed');
                el.style.maxHeight = 0;
                el.style.opacity = '0';
            }
            button.style.visibility = 'hidden';
            
        });
    }

    // Prevents expandable text being cut off on resize because we set a max height for expand/collapse functionality.
    let resize = debounce(function() {
        let elements = document.querySelectorAll('.expandable:not(.collapsed)');
        for (element of elements) {
            element.style.maxHeight = element.scrollHeight + 'px';
        }
    }, 50);

    window.addEventListener('resize', resize);

})();

(function expandAndCollapseStats() {
    let buttons = document.getElementsByClassName('expandStatsButton');
    for (let button of buttons) {
        button.addEventListener('click', function() {
            let el = document.getElementsByClassName(button.id)[0];
            if (el.classList.contains('collapsed')) {
                let canvasId = button.id.replace('Stats', 'Chart');
                renderChart(canvasId);
                el.classList.remove("collapsed");
                el.style.maxHeight = el.scrollHeight + "px";
            } else {
                el.classList.add('collapsed');
                el.style.maxHeight = 0;
            }
        });
    }
})();

// Original function from https://eddyerburgh.me/animate-elements-scrolled-view-vanilla-js
(function revealEvents() {
    let elements;
    let windowHeight;

    let initialise = debounce(function () {
        elements = document.querySelectorAll('.card');
        windowHeight = window.innerHeight;
        window.addEventListener('scroll', checkPosition);
        window.addEventListener('resize', initialise);
        checkPosition();
    }, 25);

    let checkPosition = debounce(function() {
        for (var i = 0, l = elements.length; i < l; i++) {
            let distanceFromTop = elements[i].getBoundingClientRect().top;
            if (distanceFromTop - windowHeight <= 0) {
                elements[i].classList.add('fade-in');
            }
        }
        elements = document.querySelectorAll('.card:not(.fade-in)');
    }, 25);

    return initialise();
})();

// Original function from https://davidwalsh.name/javascript-debounce-function
function debounce(fn, wait, immediate) { // Limits the rate that a function is called for performance.
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) fn.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) fn.apply(context, args);
    };
}

function renderChart(canvasId) {
    var ctx = document.getElementById(canvasId).getContext("2d");
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1985", "1990", "1995", "2000", "2005", "2010"],
        datasets: [
          {
            label: "Windows Sales (millions)",
            data: [0.25, 2, 40, 70, 500, 1000],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255,99,132,1)"],
            pointHoverBackgroundColor: "rgba(255,99,132,1)"
          }
        ]
      },
      options: {
          legend: {
              display: false
          },
          title: {
              display: true,
              text: 'Windows Sales (Millions)'
          }
      }
    });
}