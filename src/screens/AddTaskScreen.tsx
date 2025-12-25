import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { Task } from '../store/types';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { colors, typography, layout } from '../components/styles';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter a title for the task.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline,
      priority,
    };

    dispatch(addTask(newTask));
    navigation.goBack();
  };

  return (
    <View style={layout.container}>
      <Text style={styles.title}>Add New Task</Text>
      <CustomTextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <CustomTextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <CustomTextInput
        placeholder="Deadline (YYYY-MM-DD)"
        value={deadline}
        onChangeText={setDeadline}
      />
      <View style={styles.priorityContainer}>
        <CustomButton
          title="Low"
          onPress={() => setPriority('low')}
          style={[styles.priorityButton, priority === 'low' && styles.priorityButtonSelected]}
          textStyle={[styles.priorityButtonText, priority === 'low' && styles.priorityButtonTextSelected]}
        />
        <CustomButton
          title="Medium"
          onPress={() => setPriority('medium')}
          style={[styles.priorityButton, priority === 'medium' && styles.priorityButtonSelected]}
          textStyle={[styles.priorityButtonText, priority === 'medium' && styles.priorityButtonTextSelected]}
        />
        <CustomButton
          title="High"
          onPress={() => setPriority('high')}
          style={[styles.priorityButton, priority === 'high' && styles.priorityButtonSelected]}
          textStyle={[styles.priorityButtonText, priority === 'high' && styles.priorityButtonTextSelected]}
        />
      </View>
      <CustomButton title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 40,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  priorityButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: colors.lightGray,
  },
  priorityButtonSelected: {
    backgroundColor: colors.primary,
  },
  priorityButtonText: {
    color: colors.text,
  },
  priorityButtonTextSelected: {
    color: colors.white,
  },
});

export default AddTaskScreen;
