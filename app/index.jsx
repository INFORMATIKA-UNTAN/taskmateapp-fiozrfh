// import { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
// import TaskItem from '../src/components/TaskItem';
// import { dummyTasks } from '../src/data/dummyTasks';
// export default function HomeScreen() {
// const [tasks, setTasks] = useState(dummyTasks);
// const handleToggle = (task) => {
// setTasks(prev =>
// prev.map(t => t.id === task.id
// ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
// : t
// )
// );
// };
// return (
// <SafeAreaView style={styles.container}>
// <Text style={styles.header}>TaskMate – Daftar Tugas</Text>
// <FlatList
// data={tasks}
// keyExtractor={(item) => item.id}
// contentContainerStyle={{ padding: 16 }}
// renderItem={({ item }) => <TaskItem task={item} onToggle={handleToggle} />}
// />
// </SafeAreaView>
// );
// }
// const styles = StyleSheet.create({
// container: { flex: 1, backgroundColor: '#f8fafc' },
// header: { fontSize: 20, fontWeight: '700', padding: 16 },
// });

import { useState, useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
// Pastikan path import ini sudah benar
import TaskItem from '../src/components/TaskItem';
import { dummyTasks } from '../src/data/dummyTasks';

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'todo', atau 'done'

  const handleToggle = (task) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
          : t
      )
    );
  };

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') {
      return tasks;
    }
    // 'todo' akan memfilter status 'pending'
    const statusToFilter = activeFilter === 'done' ? 'done' : 'pending';
    return tasks.filter(task => task.status === statusToFilter);
  }, [tasks, activeFilter]);

  const FilterButton = ({ title, filter }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Kontainer untuk Filter */}
      <View style={styles.filterContainer}>
        <FilterButton title="All" filter="all" />
        <FilterButton title="Todo" filter="todo" />
        <FilterButton title="Done" filter="done" />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => <TaskItem task={item} onToggle={handleToggle} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada tugas dalam kategori ini</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: '#0f172a',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: '#1e293b',
  },
  filterButtonText: {
    color: '#334155',
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: '#f8fafc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748b',
    fontSize: 16,
  },
});