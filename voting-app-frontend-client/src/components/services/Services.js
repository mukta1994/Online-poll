export async function getAllQuestions() {
    const response = await fetch('api/getQuestions');
    return await response.json();
}

export async function createQuestion(data) {
    const response = await fetch('api/createQuestion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question: data.question,choices:data.choices,status:data.status})
      })
    return await response.json();
}

export async function sendVoteService(data) {
    const response = await fetch('api/incrementVote', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question_id: data.question_id,choice_id:data.choice_id})
      })
    return await response.json();
    
}


export async function getChoicesService(data) {
        const response = await fetch('api/getChoicesByQuestionId/'+data,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'               
               }
        });
        return await response.json();
}

export async function changeStatusService(data) {
    const response = await fetch('api/changeStatus', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({question_id: data.question_id,status:data.status})
      })
    return await response.json();
}



