// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// export default function TaskItem({ task, onToggle }) {
// const isDone = task.status === 'done';
// return (
// <TouchableOpacity onPress={() => onToggle?.(task)} activeOpacity={0.7}>
// <View style={[styles.card, isDone && styles.cardDone]}>
// <View style={{ flex: 1 }}>
// <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>
// <Text style={styles.desc}>{task.description}</Text>
// <Text style={styles.meta}>{task.category} • Due {task.deadline}</Text>
// </View>
// <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}>
// <Text style={styles.badgeText}>{isDone ? 'Done' : 'Todo'}</Text>
// </View>
// </View>
// </TouchableOpacity>
// );
// }
// const styles = StyleSheet.create({
// card: { padding: 14, borderRadius: 12, backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
// cardDone: { backgroundColor: '#f1f5f9' },
// title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
// strike: { textDecorationLine: 'line-through', color: '#64748b' },
// desc: { color: '#475569', marginBottom: 6 },
// meta: { fontSize: 12, color: '#64748b' },
// badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8, marginLeft: 12 },
// badgePending: { backgroundColor: '#fee2e2' },
// badgeDone: { backgroundColor: '#dcfce7' },
// badgeText: { fontWeight: '700', fontSize: 12 },
// });

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Fungsi untuk menentukan warna badge berdasarkan kategori
const getCategoryStyle = (category) => {
  switch (category) {
    case 'Mobile':
      return { backgroundColor: '#e0f2fe', color: '#0ea5e9' }; // Biru Muda
    case 'RPL':
      return { backgroundColor: '#dcfce7', color: '#22c55e' }; // Hijau Muda
    case 'IoT':
      return { backgroundColor: '#ffedd5', color: '#f97316' }; // Oranye Muda
    default:
      return { backgroundColor: '#e2e8f0', color: '#475569' }; // Abu-abu
  }
};

export default function TaskItem({ task, onToggle }) {
  const isDone = task.status === 'done';
  const categoryStyle = getCategoryStyle(task.category);

  return (
    <TouchableOpacity onPress={() => onToggle?.(task)} activeOpacity={0.7}>
      <View style={[styles.card, isDone && styles.cardDone]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, isDone && styles.strike]}>{task.title}</Text>
          <Text style={styles.desc}>{task.description}</Text>
          {/* Bagian meta diubah untuk menampilkan badge dan tanggal */}
          <View style={styles.footer}>
            <View style={[styles.categoryBadge, { backgroundColor: categoryStyle.backgroundColor }]}>
              <Text style={[styles.categoryText, { color: categoryStyle.color }]}>{task.category}</Text>
            </View>
            <Text style={styles.meta}>Due {task.deadline}</Text>
          </View>
        </View>
        <View style={[styles.badge, isDone ? styles.badgeDone : styles.badgePending]}>
          <Text style={[styles.badgeText, isDone ? styles.badgeTextDone : styles.badgeTextPending]}>
            {isDone ? 'Done' : 'Todo'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, borderRadius: 12, backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  cardDone: { backgroundColor: '#f8fafc' },
  title: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 4 },
  strike: { textDecorationLine: 'line-through', color: '#94a3b8' },
  desc: { color: '#475569', marginBottom: 8 }, // menambah margin bottom
  footer: { flexDirection: 'row', alignItems: 'center' }, // Style untuk footer
  meta: { fontSize: 12, color: '#64748b' },
  categoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8, // memberi jarak antara badge dan tanggal
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 12,
  },
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 10, marginLeft: 12 },
  badgePending: { backgroundColor: '#fef2f2' },
  badgeDone: { backgroundColor: '#f0fdf4' },
  badgeText: { fontWeight: '700', fontSize: 12 },
  badgeTextPending: { color: '#ef4444' }, // Warna teks untuk status
  badgeTextDone: { color: '#22c55e' }, // Warna teks untuk status
});