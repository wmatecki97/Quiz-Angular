using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace quiz_backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : Controller
    {
        readonly QuizContext context;

        public QuestionsController(QuizContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IEnumerable<Models.Question> Get()
        {
            return context.Questions;
        }

        [HttpGet("{quizId}")]
        public IEnumerable<Models.Question> Get([FromRoute] int quizId)
        {
            return context.Questions.Where(q => q.quizId == quizId);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]Models.Question question)
        {
            var quiz = context.Quiz.SingleOrDefault(q => q.id == question.quizId);

            if (quiz == null)
                return NotFound();

            context.Questions.Add(question);
            await context.SaveChangesAsync();
            return Ok(question);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody]Models.Question question)
        {
            if (id != question.id)
                return BadRequest();

            context.Entry(question).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return Ok(question);
        }
    }
}