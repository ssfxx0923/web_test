const API_URL = '/api/chat';

let messageHistory = [];

async function sendToLinkAI(message, sessionId) {
    messageHistory.push({
        role: "user",
        content: message
    });
    
    return sendToAI(messageHistory, 'linkai');
}

async function sendToClaude(message, sessionId) {
    messageHistory.push({
        role: "user",
        content: message
    });
    return sendToAI(messageHistory, 'claude');
}

async function sendToCeok(message, sessionId) {
    messageHistory.push({
        role: "user",
        content: message
    });
    return sendToAI(messageHistory, 'ceok');
}

async function sendToAI(messages, model) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: messages,
                model: model
            }),
            credentials: 'same-origin',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error('网络请求失败，请稍后重试');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        return {
            async *[Symbol.asyncIterator]() {
                try {
                    let responseText = '';
                    while (true) {
                        const {done, value} = await reader.read();
                        if (done) break;
                        
                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');
                        
                        for (const line of lines) {
                            if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
                            
                            if (line.startsWith('data: ')) {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                                        const content = data.choices[0].delta.content;
                                        responseText += content;
                                        yield content;
                                    }
                                } catch (e) {
                                    console.warn('Failed to parse line:', line, e);
                                    continue;
                                }
                            }
                        }
                    }
                    if (responseText) {
                        messageHistory.push({
                            role: "assistant",
                            content: responseText
                        });
                    }
                } catch (error) {
                    console.error('Stream error:', error);
                    throw new Error('连接中断，请刷新页面重试');
                }
            }
        };
    } catch (error) {
        console.error('Request error:', error);
        throw new Error(error.message || '请求失败，请稍后重试');
    }
}

function clearMessageHistory() {
    messageHistory = [];
}

export { sendToLinkAI, sendToClaude, sendToCeok, clearMessageHistory };
