// 전역 변수들
let sirChart, seirChart, monteCarloChart, r0Chart, interactiveChart;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    addScrollAnimations();
});

// 차트 초기화
function initializeCharts() {
    createSIRChart();
    createSEIRChart();
    createMonteCarloChart();
    createR0Chart();
    createInteractiveChart();
}

// SIR 모델 차트 생성
function createSIRChart() {
    const ctx = document.getElementById('sirChart').getContext('2d');
    const data = generateSIRData(0.3, 0.1, 1000, 10);
    
    sirChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [
                {
                    label: 'S (감염 가능)',
                    data: data.susceptible,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'I (감염됨)',
                    data: data.infected,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'R (회복됨)',
                    data: data.recovered,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    titleFont: {
                        family: 'Noto Sans KR'
                    },
                    bodyFont: {
                        family: 'Noto Sans KR'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '시간 (일)',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '인구 수',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// SEIR 모델 차트 생성
function createSEIRChart() {
    const ctx = document.getElementById('seirChart').getContext('2d');
    const data = generateSEIRData(0.3, 0.2, 0.1, 1000, 10);
    
    seirChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [
                {
                    label: 'S (감염 가능)',
                    data: data.susceptible,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'E (잠복기)',
                    data: data.exposed,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'I (감염됨)',
                    data: data.infected,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'R (회복됨)',
                    data: data.recovered,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    titleFont: {
                        family: 'Noto Sans KR'
                    },
                    bodyFont: {
                        family: 'Noto Sans KR'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '시간 (일)',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '인구 수',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 몬테카를로 시뮬레이션 결과 차트
function createMonteCarloChart() {
    const ctx = document.getElementById('monteCarloChart').getContext('2d');
    const data = generateMonteCarloData();
    
    monteCarloChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.bins,
            datasets: [{
                label: '시뮬레이션 결과 빈도',
                data: data.frequencies,
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    titleFont: {
                        family: 'Noto Sans KR'
                    },
                    bodyFont: {
                        family: 'Noto Sans KR'
                    },
                    callbacks: {
                        title: function(context) {
                            return `최대 감염자 수: ${context[0].label}명`;
                        },
                        label: function(context) {
                            return `발생 빈도: ${context.parsed.y}회`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '최대 감염자 수',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '빈도',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// R0 비교 차트
function createR0Chart() {
    const ctx = document.getElementById('r0Chart').getContext('2d');
    
    r0Chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['홍역 (12-18)', 'COVID-19 (2-3)', '독감 (1-2)', 'SARS (2-5)', 'MERS (0.3-0.8)'],
            datasets: [{
                data: [15, 2.5, 1.5, 3.5, 0.55],
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#f1c40f',
                    '#e67e22',
                    '#27ae60'
                ],
                borderWidth: 3,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 11
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    titleFont: {
                        family: 'Noto Sans KR'
                    },
                    bodyFont: {
                        family: 'Noto Sans KR'
                    },
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: R₀ = ${context.parsed}`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// 인터랙티브 차트
function createInteractiveChart() {
    const ctx = document.getElementById('interactiveChart').getContext('2d');
    const data = generateSIRData(0.3, 0.1, 1000, 10);
    
    interactiveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days,
            datasets: [
                {
                    label: 'S (감염 가능)',
                    data: data.susceptible,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'I (감염됨)',
                    data: data.infected,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'R (회복됨)',
                    data: data.recovered,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Noto Sans KR',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    titleFont: {
                        family: 'Noto Sans KR'
                    },
                    bodyFont: {
                        family: 'Noto Sans KR'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '시간 (일)',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '인구 수',
                        font: {
                            family: 'Noto Sans KR',
                            size: 14
                        }
                    },
                    ticks: {
                        font: {
                            family: 'Noto Sans KR'
                        }
                    }
                }
            },
            animation: {
                duration: 800,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// SIR 데이터 생성 함수
function generateSIRData(beta, gamma, population, initialInfected) {
    const days = [];
    const susceptible = [];
    const infected = [];
    const recovered = [];
    
    let S = population - initialInfected;
    let I = initialInfected;
    let R = 0;
    
    const dt = 0.1; // 시간 간격
    const totalDays = 200;
    
    for (let t = 0; t <= totalDays; t += dt) {
        if (Math.floor(t * 10) % 10 === 0) { // 1일 간격으로 데이터 저장
            days.push(Math.floor(t));
            susceptible.push(Math.round(S));
            infected.push(Math.round(I));
            recovered.push(Math.round(R));
        }
        
        // SIR 미분방정식 수치해법 (오일러 방법)
        const dS = -beta * S * I / population;
        const dI = beta * S * I / population - gamma * I;
        const dR = gamma * I;
        
        S += dS * dt;
        I += dI * dt;
        R += dR * dt;
        
        // 음수 방지
        S = Math.max(0, S);
        I = Math.max(0, I);
        R = Math.max(0, R);
    }
    
    return { days, susceptible, infected, recovered };
}

// SEIR 데이터 생성 함수
function generateSEIRData(beta, alpha, gamma, population, initialInfected) {
    const days = [];
    const susceptible = [];
    const exposed = [];
    const infected = [];
    const recovered = [];
    
    let S = population - initialInfected;
    let E = 0;
    let I = initialInfected;
    let R = 0;
    
    const dt = 0.1;
    const totalDays = 200;
    
    for (let t = 0; t <= totalDays; t += dt) {
        if (Math.floor(t * 10) % 10 === 0) {
            days.push(Math.floor(t));
            susceptible.push(Math.round(S));
            exposed.push(Math.round(E));
            infected.push(Math.round(I));
            recovered.push(Math.round(R));
        }
        
        // SEIR 미분방정식
        const dS = -beta * S * I / population;
        const dE = beta * S * I / population - alpha * E;
        const dI = alpha * E - gamma * I;
        const dR = gamma * I;
        
        S += dS * dt;
        E += dE * dt;
        I += dI * dt;
        R += dR * dt;
        
        S = Math.max(0, S);
        E = Math.max(0, E);
        I = Math.max(0, I);
        R = Math.max(0, R);
    }
    
    return { days, susceptible, exposed, infected, recovered };
}

// 몬테카를로 시뮬레이션 데이터 생성
function generateMonteCarloData() {
    const simulations = 1000;
    const results = [];
    
    for (let i = 0; i < simulations; i++) {
        // 매개변수에 무작위성 추가
        const beta = 0.2 + Math.random() * 0.4; // 0.2 ~ 0.6
        const gamma = 0.05 + Math.random() * 0.15; // 0.05 ~ 0.2
        const initialInfected = 5 + Math.floor(Math.random() * 20); // 5 ~ 25
        
        const data = generateSIRData(beta, gamma, 1000, initialInfected);
        const maxInfected = Math.max(...data.infected);
        results.push(maxInfected);
    }
    
    // 히스토그램 데이터 생성
    const bins = [];
    const frequencies = [];
    const binSize = 50;
    const maxResult = Math.max(...results);
    
    for (let i = 0; i <= maxResult; i += binSize) {
        bins.push(`${i}-${i + binSize}`);
        const count = results.filter(r => r >= i && r < i + binSize).length;
        frequencies.push(count);
    }
    
    return { bins, frequencies };
}

// 이벤트 리스너 설정
function setupEventListeners() {
    const betaSlider = document.getElementById('betaSlider');
    const gammaSlider = document.getElementById('gammaSlider');
    const initialInfectedSlider = document.getElementById('initialInfected');
    
    betaSlider.addEventListener('input', function() {
        document.getElementById('betaValue').textContent = this.value;
        updateR0Display();
    });
    
    gammaSlider.addEventListener('input', function() {
        document.getElementById('gammaValue').textContent = this.value;
        updateR0Display();
    });
    
    initialInfectedSlider.addEventListener('input', function() {
        document.getElementById('infectedValue').textContent = this.value;
    });
    
    updateR0Display();
}

// R0 표시 업데이트
function updateR0Display() {
    const beta = parseFloat(document.getElementById('betaSlider').value);
    const gamma = parseFloat(document.getElementById('gammaSlider').value);
    const r0 = (beta / gamma).toFixed(2);
    
    document.getElementById('currentR0').textContent = r0;
    
    const statusElement = document.getElementById('epidemic-status');
    if (r0 < 1) {
        statusElement.innerHTML = '🟢 전염병 종식 예상';
        statusElement.style.color = '#27ae60';
    } else if (r0 === 1) {
        statusElement.innerHTML = '🟡 균형 상태';
        statusElement.style.color = '#f39c12';
    } else {
        statusElement.innerHTML = '🔴 전염병 확산 중';
        statusElement.style.color = '#e74c3c';
    }
}

// 시뮬레이션 업데이트 함수
function updateSimulation() {
    const beta = parseFloat(document.getElementById('betaSlider').value);
    const gamma = parseFloat(document.getElementById('gammaSlider').value);
    const initialInfected = parseInt(document.getElementById('initialInfected').value);
    
    const data = generateSIRData(beta, gamma, 1000, initialInfected);
    
    interactiveChart.data.labels = data.days;
    interactiveChart.data.datasets[0].data = data.susceptible;
    interactiveChart.data.datasets[1].data = data.infected;
    interactiveChart.data.datasets[2].data = data.recovered;
    
    interactiveChart.update('active');
    
    // 애니메이션 효과
    const button = event.target;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// 스크롤 애니메이션 추가
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-in forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// 차트 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// 오류 처리를 위한 폴백
if (typeof Chart === 'undefined') {
    console.warn('Chart.js 로딩 실패 - 차트를 표시할 수 없습니다.');
    document.querySelectorAll('.chart-container').forEach(container => {
        container.innerHTML = '<p style="text-align: center; color: #e74c3c;">차트를 로드할 수 없습니다. 네트워크 연결을 확인해주세요.</p>';
    });
}