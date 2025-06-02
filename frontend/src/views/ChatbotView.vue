<template>
    <v-container class="chatbot-container">
        <!-- Chatbot Header -->
        <v-card class="chat-header d-flex align-center justify-space-between">
            <div class="chat-title d-flex align-center">
                <v-avatar class="bot-avatar">
                    <v-icon>mdi-robot</v-icon>
                </v-avatar>
                <span class="bot-title ml-2">Chatbot</span>
            </div>
        </v-card>

        <!-- Chat Messages -->
        <v-card class="chat-body">
            <div class="messages">
                <div v-for="(message, index) in messages" :key="index" class="message-wrapper">
                    <div v-if="message.sender === 'bot'" class="bot-message">
                        <v-avatar class="bot-avatar mr-2">
                            <v-icon>mdi-robot</v-icon>
                        </v-avatar>
                        <div class="message-content bot-content">
                            <!-- <pre> -->
                                {{ message.text }}
                            <!-- </pre> -->
                        </div>
                    </div>
                    <div v-else class="user-message">
                        <div class="message-content user-content">
                            {{ message.text }}
                        </div>
                    </div>
                </div>
            </div>
        </v-card>

        <!-- Quick Replies -->
        <!-- <div class="quick-replies" v-if="quickReplies.length > 0">
            <v-btn v-for="(reply, index) in quickReplies" :key="index" class="quick-reply"
                @click="sendQuickReply(reply)">
                {{ reply }}
            </v-btn>
        </div> -->
        <v-card class="quick-replies">
            <v-btn v-for="(reply, index) in quickReplies" :key="index" class="quick-reply" variant="text"
                @click="sendQuickReply(reply)">
                <v-icon left>mdi-message-text</v-icon> <!-- 아이콘 추가 -->
                {{ reply }}
            </v-btn>
        </v-card>


        <!-- Chat Input -->
        <div class="chat-input-container d-flex align-center">
            <v-text-field v-model="userInput" label="Type your message" class="flex-grow-1" outlined />
            <v-btn icon @click="sendMessage" variant="text" class="mr-2">
                <v-icon>mdi-send</v-icon>
            </v-btn>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
    { sender: 'bot', text: '안녕하세요! 집다 AI챗봇입니다. 무엇이 궁금하신가요?' },
]);

const userInput = ref('');
const quickReplies = ref([
    '핫한 부동산 트렌드는?',   // 트렌드 관련
    '핫한 청약 정보',    // 청약 관련
    '최근 부동산 뉴스',   // 관련 뉴스
    '부동산 고르는 기준', // 선택 기준
    '부동산 투자 조언 부탁해',   // 투자 조언
]);


const sendMessage = () => {
    if (userInput.value.trim() === '') return;

    // Add user message
    messages.value.push({ sender: 'user', text: userInput.value });
    const userMessage = userInput.value;
    userInput.value = '';

    // Add bot response
    setTimeout(() => {
        const botResponse = handleBotResponse(userMessage);
        messages.value.push({ sender: 'bot', text: botResponse });
    }, 1000);
};

const sendQuickReply = (reply) => {
    userInput.value = reply;
    sendMessage();
};

const handleBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // 부동산 트렌드
    if (lowerMessage.includes('트렌드') || lowerMessage.includes('핫한')) {
        return '최근 부동산 시장 트렌드는 소형 아파트 선호 증가와 함께 전세의 월세화가 가속화되고 있습니다. 또한 수도권 외곽 지역의 신규 분양이 주목받고 있어요.';
    }

    // 청약 정보
    if (lowerMessage.includes('청약') || lowerMessage.includes('신청')) {
        return '청약을 알아보고 계신가요? 현재 인기 있는 청약 단지로는 A아파트와 B아파트가 있습니다. 청약 신청 시에는 청약 가점, 분양가 상한제, 그리고 지역 우선 공급 조건을 꼭 확인하세요.';
    }

    // 관련 뉴스
    if (lowerMessage.includes('뉴스') || lowerMessage.includes('소식')) {
        return '최근 뉴스에 따르면, 정부가 2024년부터 재건축 규제를 완화하면서 서울 지역 재건축 단지에 관심이 쏠리고 있습니다. 또한, 전세 대출 금리 완화 정책도 주목할 만한 소식입니다.';
    }

    // 부동산 기준
    if (lowerMessage.includes('기준') || lowerMessage.includes('알아볼 때')) {
        return `부동산을 고를 때는 다음 기준을 참고하세요:
1. 입지: 교통, 교육, 상권 등 생활 편의성을 평가하세요.
2. 가격: 주변 시세와 비교해 적정한 가격인지 확인하세요.
3. 개발 계획: 해당 지역의 재개발, 교통 인프라 계획을 파악하세요.
4. 관리비: 단지 관리 상태와 관리비 수준도 중요합니다.`;
    }

    // 부동산 투자 조언
    if (lowerMessage.includes('투자') || lowerMessage.includes('부동산')) {
        return '부동산 투자 시 장기적인 관점에서 접근하세요. 특히 인구 이동이 활발한 지역과 인프라 개발 계획이 있는 곳이 유망합니다. 또한, 수익형 부동산(오피스텔, 상가)과 주거형 부동산(아파트)의 특성을 비교하여 결정하세요.';
    }

    // 기타 응답
    return '죄송하지만 해당 질문을 이해하지 못했습니다. "청약", "부동산 트렌드", "뉴스"와 같은 키워드로 질문해 주시면 더 나은 답변을 드릴 수 있습니다.';
};

const closeChat = () => {
    alert('Chat closed');
};
</script>

<style scoped>
.chatbot-container {
    max-width: 400px;
    margin: 0 auto;
    /* border: 1px solid #ccc; */
    max-height: 92vh;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #ffffff;
}

.chat-header {
    height: 55px;
    min-height: 55px;
    background-color: #3b82f6;
    color: white;
    padding: 8px 16px;
    border-radius: 4px 4px 0 0;
}

.bot-avatar {
    background-color: #ffffff20;
}

.bot-title {
    font-weight: bold;
}

.chat-body {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px;
    max-height: 60vh;
    scrollbar-width: none;
    border-radius: 0;
}

.messages {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.message-wrapper {
    display: flex;
    align-items: flex-start;
}

.bot-message {
    display: flex;
    align-items: center;
}

.user-message {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.message-content {
    max-width: 70%;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
}

.bot-content {
    background-color: #e0f7fa;
    color: #00796b;
}

.user-content {
    background-color: #bbdefb;
    color: #0d47a1;
}

.chat-input-container {
    /* padding: 8px; */
    background-color: white;
    border-top: 1px solid #ccc;
    gap: 8px;
}

.quick-replies {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 12px;
    border-radius: 0;
    gap: 12px;
    border-top: 1px solid #ccc;
}

.quick-reply {
    flex-grow: 1;
    text-transform: capitalize;
    font-size: 14px;
    font-weight: bold;
    color: #007aff;
    background-color: #eaf4ff;
    padding: 8px 12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.quick-reply:hover {
    background-color: #d2ebff;
    color: #0056b3;
}

</style>
