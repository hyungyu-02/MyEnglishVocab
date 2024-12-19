import React, { useEffect, useState } from 'react';
import { Word } from '../../types/Word';
import styles from './WordListPage.module.css';
import HomeButton from '../../components/HomeButton/HomeButton';
import AddWordForm from '../../components/AddWordForm/AddWordForm';
import ShowWords from '../../components/ShowWords/ShowWords';
import { API_URL } from '../../App';

const WordListPage: React.FC = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTerm, setEditingTerm] = useState('');
    const [editingDefinition, setEditingDefinition] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setWords(data as Word[]))
            .catch(err => console.error(err));
    }, []);

    const handleAddWord = async (term: string, definition: string) => {
        const newWord = {
            term: term,
            definition: definition
        };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWord),
            });
            if(!response.ok) throw new Error('Failed to add word');

            const createdWord = await response.json();
            setWords(prev => [...prev, createdWord]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('정말로 이 단어를 삭제하시겠습니까?')) return;
        try{
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete word');
            setWords(prev => prev.filter(word => word.id !== id));
        } catch (error){
            console.error(error);
        }
    };

    const handleEditStart = (word: Word) => {
        setEditingId(word.id);
        setEditingTerm(word.term);
        setEditingDefinition(word.definition);
    };
    
    const handleEditCancel = () => {
        setEditingId(null);
        setEditingTerm('');
        setEditingDefinition('');
    };

    const handleEditSave = async () => {
        if (editingId === null) return;
        const updatedWord = {
          term: editingTerm,
          definition: editingDefinition
        };
        try {
          const response = await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedWord),
          });
          if (!response.ok) throw new Error('Failed to update word');
          const savedWord = await response.json();
          setWords(prev => prev.map(w => (w.id === editingId ? savedWord : w)));
          setEditingId(null);
          setEditingTerm('');
          setEditingDefinition('');
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Word List</h2>

            <HomeButton />
            <br />

            <AddWordForm onAddWord={handleAddWord} />
            <br />
            
            <ShowWords
                words={words}
                editingId={editingId}
                editingTerm={editingTerm}
                editingDefinition={editingDefinition}
                onDelete={handleDelete}
                onEditStart={handleEditStart}
                onEditTermChange={setEditingTerm}
                onEditDefinitionChange={setEditingDefinition}
                onEditSave={handleEditSave}
                onEditCancel={handleEditCancel}
            />
        </div>
    );
};

export default WordListPage;