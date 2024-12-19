import React, { useRef, useState } from 'react';
import styles from './AddWordForm.module.css';

interface AddWordFormProps {
    onAddWord: (term: string, definition: string) => Promise<void>;
}

const AddWordForm: React.FC<AddWordFormProps> = ({ onAddWord }) => {
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const termInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!term.trim() || !definition.trim()) return;
        try {
            await onAddWord(term, definition);
            // 추가 후 필드 초기화
            setTerm('');
            setDefinition('');
            // term 입력 필드에 포커스
            termInputRef.current?.focus();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{width:'180px'}}>단어</th>
                        <th style={{width:'180px'}}>의미</th>
                        <th style={{width:'100px'}}>추가</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input ref={termInputRef} value={term} onChange={(e) => setTerm(e.target.value)} />
                        </td>
                        <td>
                            <input value={definition} onChange={(e) => setDefinition(e.target.value)} />
                        </td>
                        <td>
                            <button type="submit" className={styles.button}>
                                <img src='./add.svg' alt='addSVG' className={styles.addSVG}/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default AddWordForm;
