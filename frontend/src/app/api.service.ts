import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'

@Injectable()
export class ApiService{

    private selectedQuestion = new Subject<any>(); 
    selectedQuiz = new Subject<any>();

    private quizSelected = this.selectedQuiz.asObservable();
    questionSelected = this.selectedQuiz.asObservable();

    constructor(private http: HttpClient){}
    
    getQuestions(quizId){
       return this.http.get(`http://localhost:54202/api/Questions/${quizId}`)
    
    }

    postQuestion(question){
        this.http.post('http://localhost:54202/api/Questions',question).subscribe(res => {
            console.log(res)
        })
    }

    putQuestion(question){
        this.http.put(`http://localhost:54202/api/Questions/${question.id}`,question).subscribe(res => {
            console.log(res)
        })
    }

    selectQuestion(question){
        this.selectedQuestion.next(question); 
    }

    postQuiz(quiz){
        this.http.post('http://localhost:54202/api/Quizzes',quiz).subscribe(res => {
            console.log(res)
        })
    }

    putQuiz(quiz){
        this.http.put(`http://localhost:54202/api/Quizzes/${quiz.id}`,quiz).subscribe(res => {
            console.log(res)
        })
    }

    getQuizzes(){
        return this.http.get('http://localhost:54202/api/Quizzes')     
     }

     selectQuiz(quiz){
        this.selectedQuiz.next(quiz); 
    }

    
}