import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTask, deleteTask, setSortType } from '../store/tasksSlice';
import auth from '@react-native-firebase/auth';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { colors, typography, layout } from '../components/styles';
import { Task } from '../store/types';

const HomeScreen = ({ navigation }) => {
  const { tasks, sortType } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

  const sortedTasks = [...tasks].sort((a: Task, b: Task) => {
    if (sortType === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortType === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const renderItem = ({ item }) => (
    <Card style={styles.taskCard}>
      <TouchableOpacity onPress={() => dispatch(toggleTask(item.id))} style={styles.taskContent}>
        <Text style={[styles.taskTitle, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
          {item.title}
        </Text>
        <Text style={typography.body}>{item.description}</Text>
      </TouchableOpacity>
      <CustomButton
        title="Delete"
        onPress={() => dispatch(deleteTask(item.id))}
        style={styles.deleteButton}
        textStyle={styles.deleteButtonText}
      />
    </Card>
  );

  return (
    <View style={layout.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Your Tasks</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sortContainer}>
        <CustomButton title="By Priority" onPress={() => dispatch(setSortType('priority'))} style={styles.sortButton} />
        <CustomButton title="By Deadline" onPress={() => dispatch(setSortType('deadline'))} style={styles.sortButton} />
        <CustomButton title="By Date" onPress={() => dispatch(setSortType('createdAt'))} style={styles.sortButton} />
      </View>
      <FlatList
        data={sortedTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <CustomButton title="Add Task" onPress={() => navigation.navigate('AddTask')} style={styles.addButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    ...typography.body,
    color: colors.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: colors.lightGray,
    paddingVertical: 10,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    ...typography.h2,
    fontSize: 18,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: colors.red,
    width: 80,
    height: 40,
    paddingVertical: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default HomeScreen;
