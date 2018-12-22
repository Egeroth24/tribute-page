
(function expandAndCollapseText() {

    let buttons = document.getElementsByClassName('moreOrLessButton');
    for (let button of buttons) {
        button.addEventListener('click', function() {

            let year = button.id.substr(0, 4);
            let el = document.getElementsByClassName(year + 'Text')[0];
            
            // BUG: If button display properties are set to none before scrollHeight calculation, they can be cut off.
            //      Only the less button suffers from this if the More button is pressed twice.
            //      If button display properties are set to none before scrollHeight calc, the height of an expandable element
            //      stutters.
            //      Ensuring the Less button is never pushed to a new line on its own, and is kept inline with some paragraph text,
            //      and setting scrollHeight before display property should alleviate this issue.
            if (button.id === year + 'More') {
                document.getElementById(button.id.replace('More', 'Less')).style.visibility = 'visible';
                el.classList.remove('collapsed');
                el.style.maxHeight = el.scrollHeight + 'px';
                el.style.opacity = "1";
            } else {
                document.getElementById(button.id.replace('Less', 'More')).style.visibility = 'visible';
                el.classList.add('collapsed');
                el.style.maxHeight = 0;
                el.style.opacity = "0";
            }
            button.style.visibility = 'hidden';
            
        });
    }

})();

(function expandAndCollapseStats() {
    let buttons = document.getElementsByClassName('expandStatsButton');
    for (let button of buttons) {
        button.addEventListener('click', function() {
            let el = document.getElementsByClassName(button.id)[0];
            if (el.classList.contains('collapsed')) {
                el.classList.remove('collapsed');
                
                let canvas = button.id + '';
                canvas = canvas.replace('Stats', 'Chart');

                // TODO: Move this to another function.
                // TODO: Move chart data to object of all charts.
                let ctx = document.getElementById(canvas).getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['red', 'blue'],
                        datasets: [{
                            label: '# of votes',
                            data: [1, 2],
                            backgroundColor: [
                                'red',
                                'blue'
                            ],
                            borderColor: [
                                'brown',
                                'purple'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {

                    }
                });

                el.style.maxHeight = el.scrollHeight + 'px';
            } else {
                el.classList.add('collapsed');
                el.style.maxHeight = 0;
            }
        });
    }

    function createChart() {

    }
})();
