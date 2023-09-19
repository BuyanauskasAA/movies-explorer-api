module.exports = {
  badRequest: 'Некорректные данные!',
  conflict: 'Пользователь c таким Email уже зарегистрирован!',
  forbidden: 'Фильм сохранен другим пользователем!',
  userNotFound: 'Пользователь не найден!',
  filmNotFound: 'Фильм не найден!',
  wrongURL: 'Неверный ULR-запрос к серверу!',
  unauthorized: 'Необходима авторизация!',
  wrongEmailOrPassword: 'Неправильные почта или пароль!',
  serverError: 'На сервере произошла ошибка!',
  signOut: 'Выход из аккаунта!',
  databaseUp: 'Database connected!',
  serverUp: (port) => `Server is running on port ${port}`,
};
