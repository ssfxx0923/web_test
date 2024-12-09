const API_URL = '/api/chat';

async function sendToLinkAI(message, sessionId) {
    return sendToAI(message, 'linkai');
}

async function sendToClaude(message, sessionId) {
    return sendToAI(message, 'claude');
}

async function sendToCeok(message, sessionId) {
    return sendToAI(message, 'ceok');
}

async function sendToAI(message, model) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: "user",
                    content: message
                }],
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
                                        yield data.choices[0].delta.content;
                                    }
                                } catch (e) {
                                    console.warn('Failed to parse line:', line, e);
                                    continue;
                                }
                            }
                        }
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

export { sendToLinkAI, sendToClaude, sendToCeok };
