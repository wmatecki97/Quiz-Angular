import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs'

@Injectable()
export class ApiService{

    private selectedQuestion = new Subject<any>(); 

    questionSelected = this.selectedQuestion.asObservable();

    constructor(private http: HttpClient){}
    
    getQuestions(){
       return this.http.get('http://localhost:54202/api/Questions')
    
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

    postQuiz(quiz){
        this.http.post('http://localhost:54202/api/Quizzes',quiz).subscribe(res => {
            console.log(res)
        })
    }

    selectQuestion(question){
        this.selectedQuestion.next(question); 
    }
}