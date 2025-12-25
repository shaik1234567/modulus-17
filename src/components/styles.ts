// src/components/styles.ts

export const colors = {
  primary: '#6200ee',
  primaryDark: '#3700b3',
  accent: '#03dac6',
  background: '#f6f6f6',
  text: '#333333',
  white: '#ffffff',
  gray: '#cccccc',
  lightGray: '#e0e0e0',
  red: '#c51162',
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
};

export const layout = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
