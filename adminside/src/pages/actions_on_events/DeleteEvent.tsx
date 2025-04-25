import { useState } from 'react';
import './file3.css';

const DeleteEvent: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Функция для удаления мероприятия
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Здесь логика API-запроса на удаление
      // await deleteEventAPI();
      alert('Мероприятие успешно удалено!');
    } catch (error) {
      alert('Ошибка при удалении мероприятия');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-event-container">
    
    <div className="breadcrumbs">
      Таблицы/Мероприятия/...
    </div>

    <div className="confirmation-box">
      <div className="text-content">
        <h2>Вы хотите удалить мероприятие?</h2>
        <p>Для того, чтобы удалить мероприятие, подтвердите действие</p>
      </div>

      <div className="button-group">
        <button 
          onClick={handleDelete} 
          disabled={isDeleting}
          className="delete-btn"
        >
          {isDeleting ? 'Удаление...' : 'Да, удалить'}
        </button>
        <button 
          onClick={() => window.history.back()} 
          className="cancel-btn"
        >
          Нет
        </button>
      </div>
    </div>
  </div>
  );
};

export default DeleteEvent;