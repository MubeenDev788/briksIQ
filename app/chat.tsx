import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { ArrowLeft, Send, Bot, User, Mic, Paperclip } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { theme } from '@/utils/theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI real estate assistant. I can help you find properties, answer questions about listings, and provide market insights. How can I assist you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(message.trim()),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'I can help you find properties within your budget. What\'s your preferred price range? For example, are you looking for properties under 5 Cr, between 5-10 Cr, or above 10 Cr?';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('area')) {
      return 'Great! Location is key in real estate. Which areas are you interested in? We have excellent properties in DHA Lahore, Gulberg, Model Town, Bahria Town, and many other prime locations.';
    } else if (lowerMessage.includes('bedroom') || lowerMessage.includes('bhk')) {
      return 'How many bedrooms are you looking for? We have a variety of options from 1BHK apartments to spacious 5+ bedroom villas. I can show you properties that match your requirements.';
    } else if (lowerMessage.includes('agent') || lowerMessage.includes('contact')) {
      return 'I can connect you with our verified agents. They are experienced professionals who can provide detailed information and arrange property visits. Would you like me to share contact details of agents in your preferred area?';
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! I\'m here to help you find your perfect home. Feel free to ask me anything about properties, locations, prices, or market trends.';
    } else {
      return 'That\'s a great question! I can help you with property searches, price comparisons, location insights, and connecting with agents. Could you tell me more about what specific type of property you\'re looking for?';
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const MessageBubble = ({ message: msg }: { message: Message }) => (
    <Animatable.View 
      animation="fadeInUp" 
      duration={300}
      style={[
        styles.messageBubble,
        msg.isUser ? styles.userMessage : styles.aiMessage
      ]}
    >
      <View style={styles.messageHeader}>
        {msg.isUser ? (
          <User size={16} color={theme.colors.text} />
        ) : (
          <Bot size={16} color={theme.colors.primary} />
        )}
        <Text style={styles.messageTime}>
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <Text style={[
        styles.messageText,
        msg.isUser ? styles.userMessageText : styles.aiMessageText
      ]}>
        {msg.text}
      </Text>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.aiIndicator}>
            <Bot size={20} color={theme.colors.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Real Estate Helper</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton}>
            <Paperclip size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        {/* Input */}
        <GlassCard style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask me about properties..."
              placeholderTextColor={theme.colors.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.micButton}>
                <Mic size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  message.trim() && styles.sendButtonActive
                ]}
                onPress={sendMessage}
                disabled={!message.trim()}
              >
                <Send size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </GlassCard>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  headerTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerActionButton: {
    padding: theme.spacing.sm,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  messageBubble: {
    marginBottom: theme.spacing.md,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    borderBottomLeftRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  messageTime: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  messageText: {
    fontSize: theme.fontSize.md,
    lineHeight: 20,
  },
  userMessageText: {
    color: theme.colors.text,
  },
  aiMessageText: {
    color: theme.colors.text,
  },
  inputContainer: {
    margin: theme.spacing.md,
    padding: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  micButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.xs,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: theme.colors.primary,
  },
});