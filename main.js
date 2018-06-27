var app = new Vue({
    el : '#app',
    data : {
        users : [],
        search : ''
    },
    created : function () {
        this.$http.get('https://randomuser.me/api/?results=10').then(function (response) {
            this.users = response.body.results;
            this.users.forEach(function (user) {
                Vue.set(user, 'edit', false);
            });

            this.generateChart();
        });

        setTimeout(function () {
            $('.modal').modal();
        }, 300);
    },
    computed: {
        tableFilter: function () {
            return this.findBy(this.users, this.search)
        }
    },
    methods : {
        toggleUser : function (index, edit) {
            this.users.forEach(function (user) {
                Vue.set(user, 'edit', false);
            });
            if (edit) {
                Vue.set(this.users[index], 'edit', false);
            } else {
                Vue.set(this.users[index], 'edit', true);
            }
        },

        generateChart : function () {
            var ctx = document.getElementById("myChart").getContext("2d");
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: this.generateData()
            });
        },

        generateData : function () {

            var data = {
                labels: [
                    "Female",
                    "Male"
                ],
                datasets: [
                    {
                        data: [0, 0],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ]
                    }]
            };

            this.users.forEach(function (user) {
                if (user.gender === 'male') {
                    data.datasets[0].data[0] += 1;
                } else {
                    data.datasets[0].data[1] += 1;
                }
            });

            return data;
        },

        findBy: function (list, value) {
            return list.filter(function (item) {
                return item.name.first.includes(value)
            })
        }
    }
});