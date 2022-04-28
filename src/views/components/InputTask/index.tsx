import React, { useCallback, useState } from 'react'
import styles from './index.module.scss'
import cn from 'classnames'

interface InputTaskProps {
  id: string
  title: string
  onEdited: (id: string, title: string) => void
  onRemoved: (id: string) => void
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [value, setValue] = useState(title)
  return (
    <div
      className={cn(styles.inputTask, {
        [styles.checked]: checked == true,
      })}
    >
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked)
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            autoFocus={true}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            className={styles.inputTaskTitleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdited(id, value)
                setIsEditMode(false)
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value)
            setIsEditMode(false)
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true)
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm('Are you sure?')) {
            onRemoved(id)
          }
        }}
      />
    </div>
  )
}
