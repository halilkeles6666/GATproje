import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
    updateTask,
    deleteTask,
    addComment,
    deleteComment,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    Comment,
    Subtask
} from '../store/slices/tasksSlice';

const TaskDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const task = useSelector((state: RootState) =>
        state.tasks.tasks.find(t => t.id === id)
    );
    const comments = useSelector((state: RootState) =>
        state.tasks.comments.filter((c: Comment) => c.taskId === id)
    );
    const subtasks = useSelector((state: RootState) =>
        state.tasks.subtasks.filter((s: Subtask) => s.taskId === id)
    );

    const [newComment, setNewComment] = useState('');
    const [newSubtask, setNewSubtask] = useState('');

    if (!task) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Görev Bulunamadı</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Aradığınız görev bulunamadı veya silinmiş olabilir.
                    </p>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                        Görevlere Dön
                    </button>
                </div>
            </div>
        );
    }

    const handleDelete = () => {
        if (window.confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
            dispatch(deleteTask(task.id));
            navigate('/tasks');
        }
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                taskId: id!,
                text: newComment,
                createdAt: new Date().toISOString(),
                author: 'Kullanıcı'
            };
            dispatch(addComment(comment));
            setNewComment('');
        }
    };

    const handleDeleteComment = (commentId: string) => {
        dispatch(deleteComment(commentId));
    };

    const handleAddSubtask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSubtask.trim()) {
            const subtask: Subtask = {
                id: Date.now().toString(),
                taskId: id!,
                title: newSubtask,
                completed: false
            };
            dispatch(addSubtask(subtask));
            setNewSubtask('');
        }
    };

    const handleSubtaskToggle = (subtaskId: string, completed: boolean) => {
        const subtask = subtasks.find((s: Subtask) => s.id === subtaskId);
        if (subtask) {
            dispatch(updateSubtask({ ...subtask, completed }));
        }
    };

    const handleDeleteSubtask = (subtaskId: string) => {
        dispatch(deleteSubtask(subtaskId));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                Görev Detayları
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                Görev bilgileri ve durumu
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <dl>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Başlık</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {task.title}
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Açıklama</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {task.description}
                            </dd>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${task.status === 'completed'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : task.status === 'in_progress'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                    }`}>
                                    {task.status === 'completed' ? 'Tamamlandı' : task.status === 'in_progress' ? 'Devam Ediyor' : 'Bekliyor'}
                                </span>
                            </dd>
                        </div>
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Son Teslim Tarihi</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {task.dueDate}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail; 