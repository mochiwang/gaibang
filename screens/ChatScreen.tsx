import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function ChatScreen() {
  const route = useRoute();
  const { taskerId } = route.params as { taskerId: string };
  const user = useUserStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('tasker_id', taskerId)
        .or(`sender_id.eq.${user.id},sender_id.eq.${taskerId}`)
        .order('created_at', { ascending: true });

      if (!error && data) setMessages(data);
    };

    fetchMessages();
  }, [taskerId, user]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase.from('messages').insert({
      tasker_id: taskerId,
      sender_id: user.id,
      content: newMessage.trim(),
    });

    if (!error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(), // 临时 ID，后续可更新为真实
          sender_id: user.id,
          content: newMessage.trim(),
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMine = item.sender_id === user?.id;
    return (
      <View style={[styles.messageBubble, isMine ? styles.mine : styles.theirs]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="输入消息..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageList: { padding: 20 },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '75%',
    marginBottom: 12,
  },
  mine: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirs: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  messageText: { fontSize: 16 },
  inputBar: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: '500' },
});
