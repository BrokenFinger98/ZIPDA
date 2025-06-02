<template>
    <div class="chart-container mb-4">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";

// Props 정의
const props = defineProps({
    chartData: {
        type: Array,
        required: true,
    },
});

// Chart.js 관련 변수
const chartInstance = ref(null);
const chartCanvas = ref(null); // Canvas 엘리먼트 참조

// Chart.js 옵션 (Vue Proxy로 관리하지 않음)
const chartOptions = {
    responsive: true,
    scales: {
        y: {
            position: "right",
            grid: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                fontSize: 12,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "아파트 매매 가격 추이",
        },
    },
};

// Chart.js 데이터 준비 함수
function prepareChartData(rawData) {
    return {
        labels: rawData.map((item) => item.date),
        datasets: [
            {
                label: "매매가",
                data: rawData.map((item) => item.price),
                borderColor: "rgba(255, 99, 132, 1)",
                tension: 0.3,
                borderWidth: 1,
            },
        ],
    };
}

// Chart 생성 함수
function createChart(data) {
    if (!chartCanvas.value) {
        console.error("Canvas element not found.");
        return;
    }

    const ctx = chartCanvas.value.getContext("2d");
    if (!ctx) {
        console.error("Failed to acquire canvas context.");
        return;
    }

    const chartData = prepareChartData(data); // Chart.js용 데이터 준비
    chartInstance.value = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
    });
}

// Chart 업데이트 함수
function updateChart(data) {
    if (!chartInstance.value) return;

    const chartData = prepareChartData(data); // Chart.js용 데이터 준비
    chartInstance.value.data.labels = chartData.labels;
    chartInstance.value.data.datasets[0].data = chartData.datasets[0].data;
    chartInstance.value.update();
}

// Props 데이터 변경 감지
watch(
    () => props.chartData,
    (newData) => {
        if (!chartCanvas.value) {
            console.error("Canvas element not found when trying to update chart.");
            return;
        }

        if (chartInstance.value) {
            updateChart(newData); // 차트 업데이트
        } else {
            createChart(newData); // 새 차트 생성
        }
    },
    { immediate: true }
);

// 컴포넌트 마운트 시 차트 생성
onMounted(() => {
    if (chartCanvas.value) {
        createChart(props.chartData);
    } else {
        console.error("Canvas element not found on mount.");
    }
});

// 컴포넌트 언마운트 시 Chart.js 인스턴스 제거
onBeforeUnmount(() => {
    if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
    }
});
</script>

<style scoped>
.chart-container {
    margin-bottom: 1rem;
    background-color: #3b4b5b0c;
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>




<!-- <template>
    <div class="chart-container mb-4">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Chart } from "chart.js/auto";

// Props 정의
const props = defineProps({
    chartData: {
        type: Array,
        required: true,
    },
});

// Chart.js 관련 변수
const chartInstance = ref(null);
const chartCanvas = ref(null); // canvas 엘리먼트 참조

// Chart.js 옵션 (Vue 반응형 데이터와 분리)
const chartOptions = {
    responsive: true,
    scales: {
        y: {
            position: "right",
            grid: {
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                fontSize: 12,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "아파트 매매 가격 추이",
        },
    },
};

// Chart 생성 함수
function createChart(data) {
    if (!chartCanvas.value) return;

    // Chart.js 데이터 객체 (Vue 반응형 데이터와 분리)
    const chartData = {
        labels: data.map((item) => item.date), // 날짜
        datasets: [
            {
                label: "매매가",
                data: data.map((item) => item.price), // 가격 데이터
                borderColor: "rgba(255, 99, 132, 1)",
                tension: 0.3,
                borderWidth: 1,
            },
        ],
    };

    // Chart.js 인스턴스 생성
    chartInstance.value = new Chart(chartCanvas.value, {
        type: "line", // 차트 유형
        data: chartData,
        options: chartOptions,
    });
}

// Chart 업데이트 함수
function updateChart(data) {
    if (!chartInstance.value) return;

    // Chart.js 데이터 갱신
    chartInstance.value.data.labels = data.map((item) => item.date);
    chartInstance.value.data.datasets[0].data = data.map((item) => item.price);

    // 차트 업데이트
    chartInstance.value.update();
}

// Props 데이터 변경 감지
watch(
    () => props.chartData,
    (newData) => {
        if (chartInstance.value) {
            // 이미 생성된 차트를 업데이트
            updateChart(newData);
        } else {
            // 차트가 없으면 새로 생성
            createChart(newData);
        }
    },
    { immediate: true }
);

// Mount 시 차트 생성
onMounted(() => {
    createChart(props.chartData);
});

// Unmount 시 차트 인스턴스 파괴
onBeforeUnmount(() => {
    if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
    }
});
</script>

<style scoped>
.chart-container {
    margin-bottom: 1rem;
    background-color: #3b4b5b0c;
    padding: 1rem;
    border-radius: 0.5rem;
}
</style> -->



<!-- <template>
    <div class="chart-container mb-4">
        <canvas ref="MyChart" />
    </div>
</template>

<script>
import { Chart, registerables } from "chart.js/auto";

export default {
    data() {
        return {
            type: "line",
            data: {
                labels: [
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021",
                    "2022",
                    "2023",
                    "2024",
                ],
                datasets: [
                    {
                        label: "매매가",
                        data: [12, 15, 14, 9, 5, 2, 3, 7, 9, 18, 17],
                        borderColor: "rgba(255, 99, 132, 1)",
                        tension: 0.3,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        position: "right",
                        grid: {
                            display: false,
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            fontSize: 12,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: "아파트 매매 가격 추이",
                    },
                },
            },
        };
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            new Chart(this.$refs.MyChart, {
                type: this.type,
                data: this.data,
                options: this.options,
            });
        },
    },
};
</script>

<style scoped>
.chart-container {
    margin-bottom: 1rem;
    background-color: #eef6ffa4;
    padding: 1rem;
    border-radius: 0.5rem;
}
</style>


<!-- <template>
    <div class="chart-container mb-4">
        
        <canvas ref="MyChart"/>
    </div>
</template>


<script>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js/auto";
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

// window.onload = function () {
//     chartDraw();
//     let legendDiv = document.getElementById('legend-div');
//     legendDiv.innerHTML = window.myChart.generateLegend();
// }

// let chartData = {
//     labels: [
//         '02/13', '02/14', '02/15', '02/16', '02/17', '02/18', '02/19'
//     ],
//     datasets: [
//         {
//             label: '가격1',
//             fill: false,
//             data: [
//                 550000, 550000, 550000, 550000, 550000, 550000, 550000
//             ],
//             pointRadius: [
//                 3, 3, 3, 3, 3, 3, 3
//             ],
//             backgroundColor: 'pink',
//             borderColor: 'pink',
//             borderWidth: 2,
//         },
//         {
//             label: '가격2',
//             fill: false,
//             data: [
//                 5500, 5500, 5500, 5500, 5500, 5500, 5500
//             ],
//             pointRadius: [
//                 3, 3, 3, 3, 3, 3, 3
//             ],
//             backgroundColor: 'skyblue',
//             borderColor: 'skyblue',
//             borderWidth: 2,
//         }
//     ]
// }


export default {
    data: () => ({
        type: 'line',
        data: {
            labels: ['2014','2015','2016','2017','2018','2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: '매매가',
                data: [12, 15, 14, 9, 5, 2, 3, 7, 9, 18, 17],
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.5)',
                    // 'rgba(54, 162, 235, 0.5)',
                    // 'rgba(255, 206, 86, 0.5)',
                    // 'rgba(75, 192, 192, 0.5)',
                    // 'rgba(153, 102, 255, 0.5)',
                    // 'rgba(255, 159, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    // 'rgba(200, 200, 200, 1)',
                ],
                
                pointStyle: false,
                tension: 0.3,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            // maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    position: 'right',
                    gridLines: {
                        display: false,
                    },
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontSize: 2
                    }
                }],
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: '아파트 매매 가격 추이'
                },
                usePointStyle: false,
            },
        },
        
    }),
    mounted() {
        this.createChart()
    },
    methods: {
        createChart() {
            new Chart(this.$refs.MyChart, {
                type: 'line',
                data: this.data,
                options: this.options
            })
        }
    }
}

// const getOrCreateLegendList = (myChart, id) => {
//     const legendContainer = document.getElementById(id);
//     let listContainer = legendContainer.querySelector('ul');

//     if (!listContainer) {
//         listContainer = document.createElement('ul');
//         legendContainer.appendChild(listContainer);
//     }
//     return listContainer;
// };

// const htmlLegendPlugin = {
//     id: 'htmlLegend',
//     afterUpdate(chart, args, options) {
//         const ul = getOrCreateLegendList(chart, options.containerID);
//         // Remove old legend items
//         while (ul.firstChild) {
//             ul.firstChild.remove();
//         }
//         // Reuse the built-in legendItems generator
//         const items = chart.options.plugins.legend.labels.generateLabels(chart);
//         items.forEach(item => {
//             let classText = ''
//             if (item.text === '가격1') { classText = 'max' }
//             else { classText = 'normal' }

//             const li = document.createElement('div');
//             li.classList.add('wrap');
//             // Color box
//             const boxSpan = document.createElement('span')
//             boxSpan.classList.add(`box-${classText}`);
//             boxSpan.style.background = item.fillStyle;
//             // Text
//             const textContainer = document.createElement('p');
//             textContainer.classList.add(`value-${classText}`);
//             const text = document.createTextNode(item.text);
//             textContainer.appendChild(text);

//             const helpCircle = document.createElement('img');
//             helpCircle.src = '{% static 'imgs / stockList / includes / phone_list_table / help - circle.svg' %}';
//             helpCircle.onclick = modalOpenClose;
//             helpCircle.classList.add(`modal-${classText}-price`);
//             li.appendChild(boxSpan);
//             li.appendChild(textContainer);
//             li.appendChild(helpCircle);
//             ul.appendChild(li);
//         });
//     }
// };

</script>


<style scoped>
.chart-container {
    margin-bottom: 1rem;
    background-color: #3b4b5b0c;
    padding: 1rem;
    border-radius: 0.5rem;
}
</style> -->
