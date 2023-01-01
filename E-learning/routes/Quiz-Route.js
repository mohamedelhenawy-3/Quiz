const router = require("express").Router();
const { application } = require("express");
const Question = require("../models/question-models");
const Quiz = require("../models/Quiz-model");






router.post('/',async(req,res)=>{
    //idsquestion
    const questionsId=Promise.all(req.body.questions.map(async question=>{
        let newquestion=new Question({
            desc:question.desc,
            choose:question.choose,
            mark:question.mark
        })
        newquestion=await newquestion.save();
        return newquestion
    }))
  
    console.log(questionsId)
    const questionResolve=await questionsId;
    const quiz=new Quiz({
            title:req.body.title,
            questions:questionResolve,
    })
    const savedQuiz=await quiz.save();
    res.send(savedQuiz);

})
router.get('/:id',async(req,res)=>{
    const quiz=await Quiz.findById(req.params.id).populate('questions')
    const x=quiz.questions.map(y=>{
            return y.choose.map(v=>{
                return v.isCorrect
            })
       
    })
     console.log(x[0][0]
        )
     res.send(x)

})

router.post('/answer/:id',async(req,res)=>{
    const quiz=await Quiz.findById(req.params.id).populate('questions').select('questions')
    console.log(quiz)
    const x=quiz.questions.map(y=>{
            return y.choose.map(v=>{
                return v.isCorrect//[[true,false],[true,false]]
            })   
                 
    })
  
     const marks=quiz.questions.map(z=>{
            return z.mark
                 
    })
    console.log(marks)
    const totalMarks = marks.reduce((a,b)=>a+b ,0)
    console.log(totalMarks)
    const arr = req.body.arr;
    var answers = 0
    for(var i=0;i<arr.length;i++){
        if(x[i][arr[i]])    {
            answers+=10
        }
    }
    res.json(`Your mark = ${answers}/${totalMarks}`);
    
 
    
})



module.exports=router;