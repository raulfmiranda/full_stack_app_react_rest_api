import React from 'react';

const Message = ({ message }) => {

    return (
        <div class="bounds">
            <h1>{ message.title }</h1>
            <p>{ message.body }</p>
        </div>
    );
}

export default Message;