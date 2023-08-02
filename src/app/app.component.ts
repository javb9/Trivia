import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private CountriesServices: CountriesService) { }

  title = 'Trivia';
  question = '';
  showButton = false;
  correctAnswerOption = "";
  correctAnswer="";
  countries: any = [];
  seleccion = "";
  flag:string="";
  amountQuestions = 4;
  end = true;
  correct=0;

  ngOnInit() {
    this.cargarPaises.then((el: any) =>
      setTimeout(() => {
        this.cargarPregunta()
      }, 1000)
    );
  }


  cargarPaises = new Promise<any>((resolve, reject) => {
    this.CountriesServices.getCountrie().subscribe((r: any) => this.countries = r);
    resolve(this.countries);
  })


  cargarPregunta() {
    while(this.amountQuestions!=0){
      let tipoPregunta = this.tiposPreguntas[Math.floor(Math.random() * this.tiposPreguntas.length)]
      let aleatorio = this.countries[Math.floor(Math.random() * this.countries.length)];
      console.log(aleatorio)
      if (tipoPregunta == 1) {
        this.loadOptionsFlag(aleatorio);
      } else {
        this.loadOptionsCapital(aleatorio);
      }
      this.amountQuestions--;
      return;
    }
    this.end=false;
  }

  loadOptionsCapital(aleatorio:any){
      this.question = 'Cual es la capital de ' + aleatorio.translations.spa.common;
      this.correctAnswer = aleatorio.capital[0];
      let opcion = Math.floor(Math.random() * 4);
      this.opciones[opcion].valor = this.correctAnswer;
      this.opciones.forEach((el:any)=>{
        let previous:any = []
        let contriesWitoutCorrect = this.countries.filter((p:any)=>p != aleatorio);
        if(previous.length>0){
          previous.forEach((el:any)=>{
            contriesWitoutCorrect = this.countries.filter((p:any)=>p != el);
          })
        }
        let aleatoriosIncorrectos = contriesWitoutCorrect[Math.floor(Math.random() * contriesWitoutCorrect.length)];

        if(el.valor == ""){
          el.valor = aleatoriosIncorrectos.capital[0]
        }
        previous.push(aleatoriosIncorrectos);
      })
  }

  loadOptionsFlag(aleatorio:any){
      this.flag=aleatorio.flags.png;
      this.question = 'De que pais es la bandera';
      this.correctAnswer = aleatorio.translations.spa.common;
      let opcion = Math.floor(Math.random() * 4);
      this.opciones[opcion].valor = this.correctAnswer;
      this.opciones.forEach((el:any)=>{
        let previous:any = []
        let contriesWitoutCorrect = this.countries.filter((p:any)=>p != aleatorio);
        if(previous.length>0){
          previous.forEach((el:any)=>{
            contriesWitoutCorrect = this.countries.filter((p:any)=>p != el);
          })
        }
        let aleatoriosIncorrectos = contriesWitoutCorrect[Math.floor(Math.random() * contriesWitoutCorrect.length)];

        if(el.valor == ""){
          el.valor = aleatoriosIncorrectos.translations.spa.common
        }
        previous.push(aleatoriosIncorrectos);
      })
  }

  Seleccion(opcion: string) {
    
    if (opcion == this.seleccion) {
      this.seleccion = "";
    } else {
      this.seleccion = opcion;
    }
  }

  ValidateAnswer() {
    
    if (this.seleccion != '') {
      let selected = this.opciones.find((p:any)=>p.opcion == this.seleccion);
      if(selected.valor == this.correctAnswer){
        this.correctAnswerOption = selected.opcion;
        this.correct++;
      }else{
        let correct = this.opciones.find((p:any)=>p.valor == this.correctAnswer);
        this.correctAnswerOption = correct.opcion;
      }
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  Next() {
    this.showButton = false;
    this.correctAnswerOption = '';
    this.seleccion = "";
    this.flag="";
    this.correctAnswer=""
    this.opciones.forEach((el:any) => {
      el.valor="";
    });
    this.cargarPregunta();
  }

  opciones: any = [
    {'opcion':'A', 'valor':''}, 
    {'opcion':'B', 'valor':''}, 
    {'opcion':'C', 'valor':''}, 
    {'opcion':'D', 'valor':''}
  ]

  Reintentar(){
    this.end=true;
    this.amountQuestions=4
    this.correct=0;
    this.Next();
  }

  tiposPreguntas = [1, 2] //1-> por bandera 2-> por capital
}


