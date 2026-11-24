import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const initialTasks = [
  { id: 1, title: "Revisar JavaScript", done: true },
  { id: 2, title: "Criar a primeira tela", done: false },
  { id: 3, title: "Testar o app no celular", done: false },
];

const colors = {
  background: "#0C0C0E",
  surface: "#17171A",
  text: "#F4F4F5",
  muted: "#A1A1AA",
  border: "#3F3F46",
  accent: "#C4B5FD",
};

export default function TaskScreen() {
  const [draft, setDraft] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

  const nextId = useRef(4);

  const pendingCount = tasks.filter((task) => !task.done).length;

  const canAdd = draft.trim().length > 0;

  function addTask() {
    const title = draft.trim();

    if (!title) return;

    const task = { id: nextId.current, title, done: false };

    nextId.current += 1;

    setTasks((current) => [...current, task]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          contentContainerStyle={styles.page}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.heading}>
              <Text accessibilityRole="header" style={styles.title}>
                Minhas tarefas
              </Text>
              <Text style={styles.muted}>
                {pendingCount === 1
                  ? "1 tarefa pendente"
                  : `${pendingCount} tarefas pendentes`}
              </Text>
            </View>
            <View style={styles.form}>
              <TextInput
                accessibilityLabel="Nova tarefa"
                placeholder="Nova tarefa"
                placeholderTextColor={colors.muted}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={addTask}
                returnKeyType="done"
                style={styles.input}
              />
              <Pressable
                accessibilityRole="button"
                disabled={!canAdd}
                onPress={addTask}
                style={({ pressed }) => [
                  styles.addButton,
                  (!canAdd || pressed) && styles.dimmed,
                ]}
              >
                <Text style={styles.addLabel}>Adicionar</Text>
              </Pressable>
            </View>

            {tasks.length === 0 && (
              <Text style={styles.empty}>Nenhuma tarefa por aqui.</Text>
            )}

            {tasks.map((task) => (
              <View key={task.id} style={styles.row}>
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityLabel={task.title}
                  aria-checked={task.done}
                  onPress={() => toggleTask(task.id)}
                  style={styles.task}
                >
                  <View style={[styles.checkbox, task.done && styles.checked]}>
                    {task.done && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={[styles.taskTitle, task.done && styles.done]}>
                    {task.title}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remover ${task.title}`}
                  onPress={() => removeTask(task.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.muted}>Remover</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  page: { paddingHorizontal: 20, paddingVertical: 34 },
  content: { alignSelf: "center", width: "100%", maxWidth: 480, gap: 10 },
  heading: { gap: 6, marginBottom: 12 },
  title: {
    color: colors.text,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1.4,
  },
  muted: { color: colors.muted, fontSize: 14 },
  form: { flexDirection: "row", gap: 8, marginBottom: 10 },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    color: colors.text,
    backgroundColor: colors.surface,
    fontSize: 15,
  },
  addButton: {
    minHeight: 48,
    paddingHorizontal: 13,
    justifyContent: "center",
    backgroundColor: colors.accent,
    borderRadius: 9,
  },
  addLabel: { color: colors.background, fontSize: 14, fontWeight: "700" },
  dimmed: { opacity: 0.62 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  task: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 56,
    paddingVertical: 9,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: { backgroundColor: colors.accent, borderColor: colors.accent },
  checkmark: { color: colors.background, fontWeight: "800" },
  taskTitle: { flex: 1, color: colors.text, fontSize: 15 },
  done: { color: colors.muted, textDecorationLine: "line-through" },
  removeButton: { minHeight: 44, justifyContent: "center", paddingLeft: 9 },
  empty: { color: colors.muted, paddingVertical: 16 },
});
