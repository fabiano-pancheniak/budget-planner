import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { Wallet } from '../wallet';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.css'
})
export class DonutChartComponent implements OnChanges{
  @Input() walletData: any | undefined;
  public chart: any;
  public labels: string[] = []
  test: Object[] = []
  data: number[] = []

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['walletData'] && this.walletData) {
      this.getChartData();
      this.createChart();
    }
  }
  
  getChartData(){
    this.walletData.operations.forEach((item: any) => {
        if(item.type === 'expense'){
          this.test.push(
            {
              category: item.category,
              amount: item.amount
            }
          )
        }
    });  
      
          const groupedTransactions = this.test.reduce((accumulator: any, currentTransaction: any) => {
            const existingCategory = accumulator.find((item:any) => item.category === currentTransaction.category);
          
            if (existingCategory) {
              existingCategory.amount += currentTransaction.amount;
            } else {
              accumulator.push({ category: currentTransaction.category, amount: currentTransaction.amount });
            }
          
            return accumulator;
          }, [] as { category: string; amount: number }[]);
          
          console.log(groupedTransactions);
    
  }

createChart(){
  this.chart = new Chart("MyChart", {
    type: 'doughnut',
    data: {
        labels: this.labels,
	       datasets: [{
    label: 'Expenses chart',
    data: this.data,
    backgroundColor: [
      '#AEC6CF',
      'pink',
      'green',
			'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:1.5
      }

    });
  }

}
