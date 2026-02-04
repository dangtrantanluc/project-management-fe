import React from 'react';
import { X, DollarSign, Clock, Tag, AlignLeft } from 'lucide-react';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
  mode: 'task' | 'project' | null;  
}

export const CreateTaskModal = ({ isOpen, mode, onClose, onSubmit }: CreateTaskModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd collect form data here
    onSubmit({});
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'task' ? 'Create New Task' : 'Create New Project'}  </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label> {mode === 'task' ? 'Task Name' : 'Project Name'}</label>
              <input type="text" placeholder="e.g. Design homepage hero section" required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Add more details..." rows={3}></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cost Value</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input type="number" placeholder="0.00" style={{ paddingLeft: '32px' }} required />
                </div>
              </div>
              
              <div className="form-group">
                <label>Cost Basis</label>
                <select>
                  <option value="hour">Per Hour</option>
                  <option value="day">Per Day</option>
                  <option value="fixed">Fixed Price</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Assignee</label>
                <select>
                  <option>Select Member...</option>
                  <option>Alex Rivera</option>
                  <option>Sarah Chen</option>
                  <option>Michael Scott</option>
                </select>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};