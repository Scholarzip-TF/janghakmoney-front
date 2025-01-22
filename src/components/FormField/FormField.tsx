interface FormFieldProps {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    error?: string;
  }
  
  export const FormField = ({ label, required = false, children, error }: FormFieldProps) => {
    return (
      <div className="form-field">
        <label className="field-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        {children}
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  };