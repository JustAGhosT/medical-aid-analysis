document.addEventListener('DOMContentLoaded', function() {
  const taxBrackets = {
    18: {
      rate: 18,
      range: "R0 - R237,100",
      taxAdvantagePercentage: 4.14,
      yearlyTaxData: {
        year1: { taxSavings: 756, percentage: 4.20, compoundedSavings: 794, totalPercentage: 6.65 },
        year5: { taxSavings: 3780, percentage: 4.20, compoundedSavings: 4374, totalPercentage: 7.53 },
        year10: { taxSavings: 7560, percentage: 4.20, compoundedSavings: 9672, totalPercentage: 8.37 }
      }
    },
    26: {
      rate: 26,
      range: "R237,101 - R370,500",
      taxAdvantagePercentage: 5.98,
      yearlyTaxData: {
        year1: { taxSavings: 1092, percentage: 6.07, compoundedSavings: 1147, totalPercentage: 8.52 },
        year5: { taxSavings: 5460, percentage: 6.07, compoundedSavings: 6318, totalPercentage: 9.72 },
        year10: { taxSavings: 10920, percentage: 6.07, compoundedSavings: 13968, totalPercentage: 10.76 }
      }
    },
    31: {
      rate: 31,
      range: "R370,501 - R512,800",
      taxAdvantagePercentage: 7.13,
      yearlyTaxData: {
        year1: { taxSavings: 1302, percentage: 7.23, compoundedSavings: 1367, totalPercentage: 9.68 },
        year5: { taxSavings: 6510, percentage: 7.23, compoundedSavings: 7534, totalPercentage: 11.07 },
        year10: { taxSavings: 13020, percentage: 7.23, compoundedSavings: 16656, totalPercentage: 12.25 }
      }
    },
    36: {
      rate: 36,
      range: "R512,801 - R673,000",
      taxAdvantagePercentage: 8.28,
      yearlyTaxData: {
        year1: { taxSavings: 1512, percentage: 8.40, compoundedSavings: 1588, totalPercentage: 10.85 },
        year5: { taxSavings: 7560, percentage: 8.40, compoundedSavings: 8749, totalPercentage: 12.42 },
        year10: { taxSavings: 15120, percentage: 8.40, compoundedSavings: 19345, totalPercentage: 13.74 }
      }
    },
    39: {
      rate: 39,
      range: "R673,001 - R857,900",
      taxAdvantagePercentage: 8.97,
      yearlyTaxData: {
        year1: { taxSavings: 1638, percentage: 9.10, compoundedSavings: 1720, totalPercentage: 11.55 },
        year5: { taxSavings: 8190, percentage: 9.10, compoundedSavings: 9476, totalPercentage: 13.29 },
        year10: { taxSavings: 16380, percentage: 9.10, compoundedSavings: 20958, totalPercentage: 14.64 }
      }
    },
    41: {
      rate: 41,
      range: "R857,901 - R1,817,000",
      taxAdvantagePercentage: 9.43,
      yearlyTaxData: {
        year1: { taxSavings: 1722, percentage: 9.57, compoundedSavings: 1808, totalPercentage: 12.02 },
        year5: { taxSavings: 8610, percentage: 9.57, compoundedSavings: 9963, totalPercentage: 13.85 },
        year10: { taxSavings: 17220, percentage: 9.57, compoundedSavings: 22029, totalPercentage: 15.24 }
      }
    },
    45: {
      rate: 45,
      range: "R1,817,001+",
      taxAdvantagePercentage: 10.35,
      yearlyTaxData: {
        year1: { taxSavings: 1890, percentage: 10.50, compoundedSavings: 1985, totalPercentage: 12.95 },
        year5: { taxSavings: 9450, percentage: 10.50, compoundedSavings: 10936, totalPercentage: 14.93 },
        year10: { taxSavings: 18900, percentage: 10.50, compoundedSavings: 24176, totalPercentage: 16.43 }
      }
    }
  };

  let currentTaxRate = 36; // Default tax rate

  generateTaxTables();
  updateCharts(currentTaxRate);

  document.querySelectorAll('.tax-bracket-btn').forEach(button => {
    button.addEventListener('click', function() {
      const rate = parseInt(this.getAttribute('data-rate'));
      currentTaxRate = rate;

      document.querySelectorAll('.tax-bracket-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      updateTaxExplanation(rate);
      updateCharts(rate);
    });
  });

  updateTaxExplanation(currentTaxRate);

  function updateTaxExplanation(rate) {
    const taxData = taxBrackets[rate];
    document.getElementById('tax-explanation').innerHTML = `
      Currently showing calculations for the ${rate}% tax bracket. This applies to annual taxable income 
      between ${taxData.range}. In this bracket, salary deductions for medical aid provide a ${rate}% 
      tax saving on contributions, resulting in a total advantage of ${taxData.yearlyTaxData.year10.totalPercentage.toFixed(2)}% 
      over 10 years when compounding is included.
    `;
  }

  function generateTaxTables() {
    const container = document.getElementById('tax-tables-container');
    container.innerHTML = '';

    Object.keys(taxBrackets).forEach(rate => {
      const taxData = taxBrackets[rate];
      const tableDiv = document.createElement('div');
      tableDiv.className = `tax-table-wrapper tax-table-${rate}`;
      tableDiv.style.display = rate == currentTaxRate ? 'block' : 'none';

      tableDiv.innerHTML = `
        <h3>${rate}% Tax Bracket (${taxData.range})</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Additional Tax Savings</th>
              <th>% Tax Advantage</th>
              <th>Compounded Tax Savings</th>
              <th>Total % Improvement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>R${taxData.yearlyTaxData.year1.taxSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year1.percentage.toFixed(2)}%</td>
              <td>R${taxData.yearlyTaxData.year1.compoundedSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year1.totalPercentage.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>5</td>
              <td>R${taxData.yearlyTaxData.year5.taxSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year5.percentage.toFixed(2)}%</td>
              <td>R${taxData.yearlyTaxData.year5.compoundedSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year5.totalPercentage.toFixed(2)}%</td>
            </tr>
            <tr class="highlight">
              <td>10</td>
              <td>R${taxData.yearlyTaxData.year10.taxSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year10.percentage.toFixed(2)}%</td>
              <td>R${taxData.yearlyTaxData.year10.compoundedSavings.toLocaleString()}</td>
              <td>${taxData.yearlyTaxData.year10.totalPercentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      `;

      container.appendChild(tableDiv);
    });
  }

  function updateCharts(rate) {
    document.querySelectorAll('.tax-table-wrapper').forEach(table => {
      table.style.display = 'none';
    });
    document.querySelector(`.tax-table-${rate}`).style.display = 'block';

    const taxData = taxBrackets[rate];

    if (window.percentageChart) {
      window.percentageChart.destroy();
    }

    const percentageCtx = document.getElementById('percentageChart').getContext('2d');
    window.percentageChart = new Chart(percentageCtx, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: 'Direct Savings %',
            data: [2.33, 2.33, 2.33, 2.33, 2.33, 2.33, 2.33, 2.33, 2.33, 2.33],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          },
          {
            label: 'Compounded Savings %',
            data: [2.45, 2.51, 2.57, 2.63, 2.70, 2.76, 2.83, 2.89, 2.94, 2.99],
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          },
          {
            label: `With ${rate}% Tax Bracket Advantage`,
            data: generateTaxAdvantageData(taxData),
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Medical Aid Payment Methods: Percentage Advantage Over Time (${rate}% Tax Bracket)`,
            font: {
              size: 18
            }
          },
          legend: {
            position: 'bottom'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw.toFixed(2) + '%';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Years'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Percentage Advantage (%)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });

    if (window.cumulativeChart) {
      window.cumulativeChart.destroy();
    }

    const cumulativeCtx = document.getElementById('cumulativeChart').getContext('2d');
    window.cumulativeChart = new Chart(cumulativeCtx, {
      type: 'bar',
      data: {
        labels: [1, 2, 3, 5, 7, 10],
        datasets: [
          {
            label: 'Direct Savings (ZAR)',
            data: [420, 840, 1260, 2100, 2940, 4200],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: '#3498db',
            borderWidth: 1
          },
          {
            label: 'Compounded Savings (ZAR)',
            data: [441, 903, 1389, 2431, 3564, 5378],
            backgroundColor: 'rgba(46, 204, 113, 0.7)',
            borderColor: '#2ecc71',
            borderWidth: 1
          },
          {
            label: `With ${rate}% Tax Bracket (ZAR)`,
            data: [
              441 + taxData.yearlyTaxData.year1.compoundedSavings,
              903 + taxData.yearlyTaxData.year1.compoundedSavings * 2,
              1389 + taxData.yearlyTaxData.year1.compoundedSavings * 3,
              2431 + taxData.yearlyTaxData.year5.compoundedSavings,
              3564 + taxData.yearlyTaxData.year5.compoundedSavings * 2,
              5378 + taxData.yearlyTaxData.year10.compoundedSavings
            ],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: '#e74c3c',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Medical Aid Payment Methods: Cumulative Financial Impact (${rate}% Tax Bracket)`,
            font: {
              size: 18
            }
          },
          legend: {
            position: 'bottom'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': R' + context.raw.toLocaleString();
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Years'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Savings (ZAR)'
            },
            ticks: {
              callback: function(value) {
                return 'R' + value.toLocaleString();
              }
            }
          }
        }
      }
    });
  }

  function generateTaxAdvantageData(taxData) {
    const data = [];
    const start = taxData.yearlyTaxData.year1.totalPercentage;
    const end = taxData.yearlyTaxData.year10.totalPercentage;
    const step = (end - start) / 9;

    for (let i = 0; i < 10; i++) {
      data.push(start + step * i);
    }

    return data;
  }
});
