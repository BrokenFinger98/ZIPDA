<!-- <template>
    <div>

        <div class="header-actions">
            <h4 class="header-title">나의 쪽지함</h4>
            <v-btn color="primary" @click="isWriteMessageModalOpen = true">쪽지 작성하기</v-btn>
        </div>


        <v-expansion-panels multiple v-model="expandedPanels">

            <v-expansion-panel>
                <v-expansion-panel-title class="message-title">
                    받은 쪽지함
                    <span v-if="unreadMessagesCount > 0" class="badge">{{ unreadMessagesCount }}</span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="actions">
                        <v-btn color="primary" class="me-2" @click="markAsRead">읽음 처리</v-btn>
                        <v-btn color="error" @click="deleteSelectedMessages('received')">삭제</v-btn>
                    </div>
                    <div class="scroll">
                        <table class="message-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" v-model="selectAllReceived" @change="toggleSelectAll('received')" />
                                    </th>
                                    <th>보낸 사람</th>
                                    <th>내용</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody v-if="receivedMessages.length > 0">
                                <tr
                                    v-for="(message, index) in receivedMessages"
                                    :key="index"
                                    :class="{ 'unread-message': !message.isRead }"
                                    @mouseover="hoverRow(index)"
                                    @mouseleave="hoverRow(-1)"
                                >
                                    <td>
                                        <input type="checkbox" v-model="selectedMessages" :value="message" />
                                    </td>
                                    <td @click.stop="openSenderMenu($event, message.sender)">
                                        <span class="clickable">{{ message.sender }}</span>
                                    </td>
                                    <td @click="openMessageModal(message, 'received')">{{ message.preview }}</td>
                                    <td>{{ message.date }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" class="no-messages">쪽지함이 비어 있습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>


            <v-expansion-panel>
                <v-expansion-panel-title class="message-title">보낸 쪽지함</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="actions">
                        <v-btn color="error" @click="deleteSelectedMessages('sent')">삭제</v-btn>
                    </div>
                    <div class="scroll">
                        <table class="message-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" v-model="selectAllSent" @change="toggleSelectAll('sent')" />
                                    </th>
                                    <th>받는 사람</th>
                                    <th>내용</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody v-if="sentMessages.length > 0">
                                <tr v-for="(message, index) in sentMessages" :key="index">
                                    <td>
                                        <input type="checkbox" v-model="selectedMessages" :value="message" />
                                    </td>
                                    <td>{{ message.receiver }}</td>
                                    <td @click="openMessageModal(message, 'sent')">{{ message.preview }}</td>
                                    <td>{{ message.date }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" class="no-messages">쪽지함이 비어 있습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>


        <v-dialog v-model="isReceivedMessageModalOpen" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>보낸 사람: {{ selectedMessage.sender }}</span>
                    <small>{{ selectedMessage.date }}</small>
                </v-card-title>
                <v-card-text>{{ selectedMessage.content }}</v-card-text>
                <v-card-actions>
                    <v-btn color="primary" text @click="replyToMessage(selectedMessage)">답장하기</v-btn>
                    <v-btn color="error" text @click="deleteMessage('received')">삭제</v-btn>
                    <v-btn color="default" text @click="closeMessageModal('received')">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="isSentMessageModalOpen" max-width="500px">
            <v-card>
                <v-card-title>
                    <span>받는 사람: {{ selectedMessage.receiver }}</span>
                    <small>{{ selectedMessage.date }}</small>
                </v-card-title>
                <v-card-text>{{ selectedMessage.content }}</v-card-text>
                <v-card-actions>
                    <v-btn color="error" text @click="deleteMessage('sent')">삭제</v-btn>
                    <v-btn color="default" text @click="closeMessageModal('sent')">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="isWriteMessageModalOpen" max-width="600px">
            <v-card>
                <v-card-title>쪽지 작성</v-card-title>
                <v-card-text>
                    <v-text-field v-model="search" label="팔로잉 검색" prepend-inner-icon="mdi-magnify" clearable />
                    <v-list>
                        <v-list-item v-for="(follower, index) in filteredFollowers" :key="index" @click="addReceiver(follower)">
                            <v-list-item-title>{{ follower.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-textarea v-model="newMessage.content" label="메시지 내용" />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="sendMessage">보내기</v-btn>
                    <v-btn text @click="isWriteMessageModalOpen = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

// State variables
const receivedMessages = ref([
    { id: 1, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 2, sender: "이사용자", receiver: "김싸피", preview: "지난번 이야기 어땠나요?", content: "지난번 이야기 어땠나요?", date: "2024-11-19 18:30", isRead: true },
]);

const sentMessages = ref([
    { id: 3, receiver: "박사용자", sender: "김싸피", preview: "네! 좋은 하루 보내세요.", content: "네! 좋은 하루 보내세요.", date: "2024-11-19 12:00", isRead: false },
]);

const followers = ref([
    { name: "박사용자", avatar: "https://via.placeholder.com/150" },
    { name: "이사용자", avatar: "https://via.placeholder.com/150" },
]);


const expandedPanels = ref([0, 1]); // 두 패널 모두 열림

const selectedMessages = ref([]);
const selectedMessage = ref({});
const isReceivedMessageModalOpen = ref(false);
const isSentMessageModalOpen = ref(false);
const isWriteMessageModalOpen = ref(false);
const search = ref("");
const newMessage = ref({ content: "" });
const selectedReceivers = ref([]);

// Computed
const unreadMessagesCount = computed(() => receivedMessages.value.filter((msg) => !msg.isRead).length);
const filteredFollowers = computed(() =>
    followers.value.filter((follower) =>
        follower.name.toLowerCase().includes(search.value.toLowerCase())
    )
);

// Methods
const openMessageModal = (message, type) => {
    selectedMessage.value = message;
    if (type === "received") isReceivedMessageModalOpen.value = true;
    else isSentMessageModalOpen.value = true;
};

const closeMessageModal = (type) => {
    if (type === "received") isReceivedMessageModalOpen.value = false;
    else isSentMessageModalOpen.value = false;
    selectedMessage.value = {};
};

const addReceiver = (receiver) => {
    if (!selectedReceivers.value.includes(receiver.name)) selectedReceivers.value.push(receiver.name);
};

const sendMessage = () => {
    if (selectedReceivers.value.length && newMessage.value.content) {
        sentMessages.value.push({
            id: sentMessages.value.length + 1,
            receiver: selectedReceivers.value.join(", "),
            sender: "김싸피",
            preview: newMessage.value.content.slice(0, 20),
            content: newMessage.value.content,
            date: new Date().toLocaleString(),
            isRead: true,
        });
        isWriteMessageModalOpen.value = false;
        selectedReceivers.value = [];
        newMessage.value.content = "";
        alert("쪽지가 전송되었습니다!");
    }
};
</script>

<style scoped>
.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
}

.header-title {
    font-weight: bold;
    color: var(--vt-c-navy);
}

.message-title {
    font-weight: bold;
    color: var(--vt-c-navy);
}

.message-table {
    width: 100%;
    border-collapse: collapse;
}

.message-table tr {
    height: 1rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}


.message-table tr:hover {
    background-color: #f1f1f1;
}

.no-messages {
    color: #999;
    font-weight: bold;
}

.clickable {
    /* color: #007bff; */
    cursor: pointer;
}

.message-table th {
    font-size: 0.9rem;
    font-weight: bold;
}

.message-table th,
.message-table td {
    padding: 0.6rem;
    text-align: left;
}

.unread-message {
    font-weight: bold;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.3rem;
}

.badge {
    background-color: red;
    color: white;
    border-radius: 50%;
    margin-left: 0.5rem;
    padding: 0.35rem 0.5rem 0.3rem;
    font-size: 0.75rem;
}


.read-message {
    color: #999;
}

.v-expansion-panel {
    padding: 0;
}

.scroll {
    max-height: 20rem;
    overflow-y: auto;
}

.v-btn {
    padding: 0.2rem 0.5rem;
    height: 1.7rem;
    width: auto;
    font-size: 0.7rem;
}

.sender-menu {
    font-size: 0.8rem;
}
</style> -->


<template>
    <div>

        <div class="header-actions">
            <h4 class="header-title">나의 쪽지함</h4>
            <v-btn color="primary" class="" @click="isWriteMessageModalOpen = true">쪽지 작성하기</v-btn>
        </div>


        <v-expansion-panels multiple v-model="expandedPanels">

            <v-expansion-panel>
                <v-expansion-panel-title class="message-title">
                    받은 쪽지함
                    <span v-if="unreadMessagesCount > 0" class="badge">{{ unreadMessagesCount }}</span>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="actions">
                        <v-btn color="primary" class="me-2" @click="markAsRead">읽음 처리</v-btn>
                        <v-btn color="error" @click="deleteSelectedMessages">삭제</v-btn>
                    </div>
                    <div class="scroll">
                        <table class="message-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" v-model="selectAllReceived"
                                            @change="toggleSelectAll('received')" />
                                    </th>
                                    <th>보낸 사람</th>
                                    <th>내용</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody v-if="receivedMessages.length > 0">
                                <tr v-for="(message, index) in receivedMessages" :key="index"
                                    :class="{ 'unread-message': !message.isRead, 'read-message': message.isRead }"
                                    @mouseover="hoverRow(index)" @mouseleave="hoverRow(-1)">
                                    <td>
                                        <input type="checkbox" v-model="selectedMessages" :value="message" />
                                    </td>
                                    <td @click.stop="openSenderMenu($event, message.sender)">
                                        <span class="clickable">{{ message.sender }}</span>
                                    </td>
                                    <td @click="openMessageModal(message, 'received')">
                                        <span class="clickable">{{ message.preview }}</span>
                                    </td>
                                    <td>{{ message.date }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" class="no-messages">
                                        <p>쪽지함이 비어 있습니다.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-dialog v-model="isReceivedMessageModalOpen" max-width="500px">
                <v-card>
                    <v-card-title class="d-flex justify-space-between">
                        <span class="fw-bold mt-1">보낸 사람: <v-chip class="me-2"
                            @click:close="removeReceiver(i)">
                            {{ selectedMessage.sender }}
                        </v-chip></span>
                        

                        <small style="font-size: 0.8rem">{{ selectedMessage.date }}</small>
                    </v-card-title>
                    <v-card-text>{{ selectedMessage.content }}</v-card-text>
                    <v-card-actions>
                        <!-- <v-btn color="primary" text @click="replyToMessage(selectedMessage)">답장하기</v-btn> -->
                        <v-btn color="error" text @click="deleteMessage('received')">삭제</v-btn>
                        <v-btn color="default" text @click="closeMessageModal('received')">닫기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


            <v-dialog v-model="isSentMessageModalOpen" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span>받는 사람: {{ selectedMessage.receiver }}</span>
                        <small>{{ selectedMessage.date }}</small>
                    </v-card-title>
                    <v-card-text>{{ selectedMessage.content }}</v-card-text>
                    <v-card-actions>
                        <v-btn color="error" text @click="deleteMessage('sent')">삭제</v-btn>
                        <v-btn color="default" text @click="closeMessageModal('sent')">닫기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>



            <v-menu v-model="isSenderMenuOpen" :close-on-content-click="false" :activator="senderMenuActivator">
                <v-list class="sender-menu">

                    <v-list-item @click="viewProfile(selectedSender)">프로필 보기</v-list-item>
                    <v-list-item v-if="isFollowing(selectedSender)" @click="sendMessageTo(selectedSender)">메시지
                        보내기</v-list-item>
                </v-list>
            </v-menu>

            <v-expansion-panel>
                <v-expansion-panel-title class="message-title">보낸 쪽지함</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="actions">
                        <v-btn color="error" @click="deleteSelectedMessages">삭제</v-btn>
                    </div>
                    <div class="scroll">
                        <table class="message-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" v-model="selectAllSent"
                                            @change="toggleSelectAll('sent')" />
                                    </th>
                                    <th>받는 사람</th>
                                    <th>내용</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody v-if="sentMessages.length > 0">
                                <tr v-for="(message, index) in sentMessages" :key="index" @mouseover="hoverRow(index)"
                                    @mouseleave="hoverRow(-1)">
                                    <td>
                                        <input type="checkbox" v-model="selectedMessages" :value="message" />
                                    </td>
                                    <td>
                                        <span>{{ message.receiver }}</span>
                                    </td>
                                    <td @click="openMessageModal(message, 'sent')">
                                        <span class="clickable">{{ message.preview }}</span>
                                    </td>
                                    <td>{{ message.date }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" class="no-messages">
                                        <p>쪽지함이 비어 있습니다.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>


        <v-dialog v-model="isWriteMessageModalOpen" max-width="600">
            <v-card>
                <v-card-title>쪽지 작성</v-card-title>
                <v-card-text>
                    <v-text-field v-model="search" label="팔로잉 검색" prepend-inner-icon="mdi-magnify" clearable
                        hide-details single-line></v-text-field>

                    <div v-if="selectedReceivers.length > 0" class="py-3 px-4">
                        <v-chip v-for="(receiver, i) in selectedReceivers" :key="i" class="me-2" closable
                            @click:close="removeReceiver(i)">
                            {{ receiver }}
                        </v-chip>
                    </div>

                    <v-list v-if="filteredFollowers.length > 0">
                        <v-list-item v-for="(follower, i) in filteredFollowers" :key="i" @click="addReceiver(follower)"
                            class="clickable">
                            <template v-slot:prepend>
                                <v-avatar>
                                    <v-img :src="follower.avatar"></v-img>
                                </v-avatar>
                            </template>
                            <v-list-item-title>{{ follower.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-textarea v-model="newMessage.content" class="mt-2" label="내용을 입력하세요" variant="underlined"
                        single-line></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="sendMessage">보내기</v-btn>
                    <v-btn text @click="isWriteMessageModalOpen = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="profileModalOpen" max-width="400">
            <v-card>
                <v-card-title>{{ profileUser.name }}</v-card-title>
                <v-card-text>
                    <v-avatar>
                        <v-img :src="profileUser.avatar || 'https://via.placeholder.com/150'"></v-img>
                    </v-avatar>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="followUser(profileUser)">팔로우</v-btn>
                    <v-btn color="secondary" @click="sendMessageTo(profileUser.name)">쪽지 보내기</v-btn>
                    <v-btn text @click="profileModalOpen = false">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

// State variables
const receivedMessages = ref([
    { id: 9, sender: "John Doe", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 1, sender: "김사용자", receiver: "김싸피", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 2, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 3, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 4, sender: "이사용자", receiver: "김싸피", preview: "지난번 이야기 어땠나요?", content: "지난번 이야기 어땠나요?", date: "2024-11-19 18:30", isRead: true },
    { id: 5, sender: "이사용자", receiver: "김싸피", preview: "지난번 이야기 어땠나요?", content: "지난번 이야기 어땠나요?", date: "2024-11-19 18:30", isRead: true },
    { id: 6, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 7, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },
    { id: 8, sender: "김사용자", receiver: "김싸피", preview: "안녕하세요!", content: "안녕하세요! 어떻게 지내세요?", date: "2024-11-20 09:30", isRead: false },

]);

const sentMessages = ref([
    { id: 3, receiver: "박사용자", sender: "김싸피", preview: "네! 좋은 하루 보내세요.", content: "네! 좋은 하루 보내세요.", date: "2024-11-19 12:00", isRead: false },
]);



const selectedMessages = ref([]);
const selectedMessage = ref({});
// const isMessageModalOpen = ref(false);

const isReceivedMessageModalOpen = ref(false);
const isSentMessageModalOpen = ref(false);

const selectAllReceived = ref(false);
const selectAllSent = ref(false);
const hoveredRow = ref(-1);

const expandedPanels = ref([0, 1]); // 두 패널 모두 열림

const hoverRow = (index) => {
    hoveredRow.value = index;
};

const isSenderMenuOpen = ref(false);
const selectedSender = ref("");
const senderMenuActivator = ref(null);

const unreadMessagesCount = computed(() => {
    return receivedMessages.value.filter((message) => !message.isRead).length;
});

// Methods
const writeMessage = () => {
    router.push({ name: "msg-write" });
};


// Methods
const openMessageModal = (message, type) => {
    selectedMessage.value = message;
    if (type === "received") isReceivedMessageModalOpen.value = true;
    else isSentMessageModalOpen.value = true;
    message.isRead = true;
};

const closeMessageModal = (type) => {
    if (type === "received") isReceivedMessageModalOpen.value = false;
    else isSentMessageModalOpen.value = false;
    selectedMessage.value = {};
};


const markAsRead = () => {
    selectedMessages.value.forEach((message) => {
        if (!message.isRead) {
            message.isRead = true;
        }
    });
};


const deleteMessage = (type) => {
    if (!selectedMessage.value || !selectedMessage.value.id) return;

    // 받은 메시지와 보낸 메시지에서 선택된 메시지를 제거
    receivedMessages.value = receivedMessages.value.filter(
        (message) => message.id !== selectedMessage.value.id
    );

    sentMessages.value = sentMessages.value.filter(
        (message) => message.id !== selectedMessage.value.id
    );

    // 모달 닫기 및 선택된 메시지 초기화
    closeMessageModal(type);
    selectedMessage.value = {};
};


const deleteSelectedMessages = () => {
    receivedMessages.value = receivedMessages.value.filter(
        (message) => !selectedMessages.value.includes(message)
    );
    sentMessages.value = sentMessages.value.filter(
        (message) => !selectedMessages.value.includes(message)
    );
    isReceivedMessageModalOpen.value = false;
    isSentMessageModalOpen.value = false; //
};

const openSenderMenu = (event, sender) => {
    selectedSender.value = sender;
    senderMenuActivator.value = event.currentTarget;
    isSenderMenuOpen.value = true;
};


const isWriteMessageModalOpen = ref(false);
const menu = ref(false);



const search = ref("");
const selectedReceivers = ref([]);
const newMessage = ref({ content: "" });

// 팔로잉 목록 (샘플 데이터)
const followers = ref([
    { name: "박사용자", avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { name: "John Doe", avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { name: "Jane Smith", avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { name: "Kim User", avatar: "https://cdn.vuetifyjs.com/images/john.png" },
    { name: "Lee Developer", avatar: "https://cdn.vuetifyjs.com/images/john.png" },
]);

// 검색된 팔로잉 목록 필터링
const filteredFollowers = computed(() => {
    if (!search.value) return followers.value;
    return followers.value.filter((follower) =>
        follower.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

// Receiver 추가
const addReceiver = (receiver) => {
    if (!selectedReceivers.value.includes(receiver.name)) {
        selectedReceivers.value.push(receiver.name);
    }
};

// Receiver 삭제
const removeReceiver = (index) => {
    selectedReceivers.value.splice(index, 1);
};

// 메시지 보내기
const sendMessage = () => {
    if (selectedReceivers.value.length === 0) {
        alert("받는 사람을 선택하세요.");
        return;
    }
    if (!newMessage.value.content) {
        alert("메시지 내용을 입력하세요.");
        return;
    }

    const now = new Date();
    const sentMessage = {
        id: "1", // Unique ID
        receiver: selectedReceivers.value.join(", "), // Comma-separated list of receivers
        sender: useUserStore.user, // Assuming the current user as the sender
        preview: newMessage.value.content.substring(0, 20) + " ...",
        content: newMessage.value.content,
        date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
            now.getDate()
        ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
            2,
            "0"
        )}`,
        isRead: true,
    };

    // Add the message to sentMessages
    sentMessages.value.push(sentMessage);

    // Clear the message form and close the modal
    newMessage.value.receiver = "";
    newMessage.value.content = "";
    isWriteMessageModalOpen.value = false;

    alert("메시지가 발송되었습니다.");
};

const isFollowing = (sender) => {
    return followers.value.some((follower) => follower.name === sender);
};

const profileModalOpen = ref(false); // 프로필 모달 상태
const profileUser = ref({}); // 선택된 프로필 사용자

const viewProfile = (sender) => {
    const user = followers.value.find((follower) => follower.name === sender) || { name: sender, avatar: '' };
    profileUser.value = user; // 선택된 사용자 설정
    profileModalOpen.value = true; // 모달 열기
    isSenderMenuOpen.value = false; // Sender menu close
};

// 프로필에서 팔로우 추가
const followUser = (user) => {
    if (!followers.value.some((follower) => follower.name === user.name)) {
        followers.value.push(user);
        alert(`${user.name}님을 팔로우하였습니다.`);
    }
};


const sendMessageTo = (sender) => {
    if (!isFollowing(sender)) {
        alert("팔로우하는 사람에게만 쪽지를 보낼 수 있습니다.");
        viewProfile(sender); // 프로필 보기 및 팔로우/쪽지 옵션 제공
        return;
    }
    if (!selectedReceivers.value.includes(sender)) {
        selectedReceivers.value.push(sender); // Add the sender to the receivers
    }
    isWriteMessageModalOpen.value = true;
    profileModalOpen.value = false;
    isSenderMenuOpen.value = false;
};


const toggleSelectAll = (type) => {
    if (type === "received") {
        selectedMessages.value = selectAllReceived.value ? [...receivedMessages.value] : [];
    } else if (type === "sent") {
        selectedMessages.value = selectAllSent.value ? [...sentMessages.value] : [];
    }
};

</script>

<style scoped>
.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;
}

.header-title {
    font-weight: bold;
    color: var(--vt-c-navy);
}

.message-title {
    font-weight: bold;
    color: var(--vt-c-navy);
}

.message-table {
    width: 100%;
    border-collapse: collapse;
}

.message-table tr {
    height: 1rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}


.message-table tr:hover {
    background-color: #f1f1f1;
}

.no-messages {
    color: #999;
    font-weight: bold;
}

.clickable {
    /* color: #007bff; */
    cursor: pointer;
}

.message-table th {
    font-size: 0.9rem;
    font-weight: bold;
}

.message-table th,
.message-table td {
    padding: 0.6rem;
    text-align: left;
}

.unread-message {
    font-weight: bold;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.3rem;
}

.badge {
    background-color: red;
    color: white;
    border-radius: 50%;
    margin-left: 0.5rem;
    padding: 0.35rem 0.5rem 0.3rem;
    font-size: 0.75rem;
}


.read-message {
    color: #999;
}

.v-expansion-panel {
    padding: 0;
}

.scroll {
    max-height: 20rem;
    overflow-y: auto;
}

.v-btn {
    padding: 0.2rem 0.5rem;
    height: 1.7rem;
    width: auto;
    font-size: 0.7rem;
}

.sender-menu {
    font-size: 0.8rem;
}
</style>