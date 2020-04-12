const PasswordField = ({ placeholder = "Password", value, onChange, error }) => (
    <div className="input-field">
        <input
            type="password"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <div className="error">
            <span className="helper-text" data-error="wrong" data-success="right">{error}</span>
        </div>
    </div>
);

export default PasswordField;
