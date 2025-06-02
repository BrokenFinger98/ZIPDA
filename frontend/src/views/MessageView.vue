<template>
    <div class="message-container">
        <router-view />
    </div>
</template>

<script setup>



</script>

<style scoped>

.message-container {
    padding: 1rem;
    width: 100%;
}

</style>



<!-- <template>
    <div class="message-container">
        <div class="message-sidebar">
            <h5 class="fw-bold p-3">쪽지함</h5>
            <v-divider></v-divider>
            <div v-for="(conversation, index) in conversations" :key="index" class="conversation-item"
                @click="selectConversation(conversation)">
                <p class="conversation-title">{{ conversation.title }}</p>
                <p class="conversation-preview">
                    {{ conversation.preview }}
                </p>
            </div>
        </div>

        <div class="message-content">
            <div v-if="!selectedConversation" class="no-conversation">
                <p>대화를 선택해주세요.</p>
            </div>

            <div v-else>
                <div class="conversation-header">
                    <h6 class="fw-bold">{{ selectedConversation.title }}</h6>
                </div>
                <v-divider></v-divider>
                <div class="conversation-body">
                    <div v-for="(message, index) in selectedConversation.messages" :key="index"
                        :class="['message', message.sender === 'me' ? 'sent' : 'received']">
                        <p>{{ message.content }}</p>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="message-input">
                    <v-textarea v-model="newMessage" rows="1" placeholder="메시지를 입력하세요..." outlined></v-textarea>
                    <v-btn color="primary" @click="sendMessage">전송</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            conversations: [
                {
                    title: "김사용자",
                    preview: "안녕하세요! 어떻게 지내세요?",
                    messages: [
                        { sender: "other", content: "안녕하세요!" },
                        { sender: "me", content: "안녕하세요! 잘 지내세요?" },
                    ],
                },
                {
                    title: "이사용자",
                    preview: "지난번에 이야기했던 건 어때요?",
                    messages: [
                        { sender: "other", content: "지난번 이야기 어땠나요?" },
                        { sender: "me", content: "좋았습니다. 다음에 이야기 더 나눠요." },
                    ],
                },
            ],
            selectedConversation: null, // 초기 선택된 대화 없음
            newMessage: "",
        };
    },
    methods: {
        selectConversation(conversation) {
            this.selectedConversation = conversation;
        },
        sendMessage() {
            if (this.newMessage.trim() && this.selectedConversation) {
                this.selectedConversation.messages.push({
                    sender: "me",
                    content: this.newMessage.trim(),
                });
                this.newMessage = "";
            }
        },
    },
};
</script>

<style scoped>
.message-container {
    display: flex;
    height: calc(100vh - 50px);
}

.message-sidebar {
    width: 30%;
    background-color: #f8f9fb;
    border-right: 1px solid #e0e0e0;
    overflow-y: auto;
}

.conversation-item {
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.conversation-item:hover {
    background-color: #e0f7fa;
}

.conversation-title {
    font-weight: bold;
    margin: 0;
    font-size: 1rem;
}

.conversation-preview {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0.2rem 0 0 0;
}

.message-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.conversation-header {
    padding: 1rem;
    background-color: #ffffff;
}

.conversation-body {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background-color: #ffffff;
}

.message {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    max-width: 60%;
}

.message.sent {
    margin-left: auto;
    background-color: #e0f7fa;
    text-align: right;
}

.message.received {
    background-color: #f1f1f1;
}

.message-input {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    gap: 0.5rem;
}

.message-input v-textarea {
    flex: 1;
}

.message-input v-btn {
    margin-left: 0.5rem;
}

.no-conversation {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #7f8c8d;
}
</style> -->
