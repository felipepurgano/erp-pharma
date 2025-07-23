import React, { useState } from 'react';
import {
    FiArrowRight,
    FiChrome,
    FiEye,
    FiEyeOff,
    FiLinkedin,
    FiLock,
    FiMail,
} from 'react-icons/fi';
import styles from './Login.module.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'E-mail é obrigatório';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'E-mail inválido';

        if (!password) newErrors.password = 'Senha é obrigatória';
        else if (password.length < 6)
            newErrors.password = 'Mínimo de 6 caracteres';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 2000));
        setIsLoading(false);
        console.log({ email, password, rememberMe });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconCircle}>
                    <FiLock size={28} />
                </div>
                <div className={styles.header}>
                    <h2 className={styles.title}>ERP Pharma</h2>
                    <p className={styles.subtitle}>Acesse sua conta para continuar</p>
                </div>

                <button className={styles.socialButton}>
                    <FiChrome />
                    Continuar com Google
                </button>
                <button className={styles.socialButton}>
                    <FiLinkedin />
                    Continuar com Linkedin
                </button>

                <div className={styles.divider}>ou continuar com e-mail</div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">E-mail</label>
                        <div className={styles.inputWrapper}>
                            <FiMail />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu e-mail"
                            />
                            {errors.email && (
                                <div className={styles.errorMessage}>{errors.email}</div>
                            )}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Senha</label>
                        <div className={styles.inputWrapper}>
                            <FiLock />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                            />
                            <button
                                type="button"
                                className={styles.eyeButton}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                            {errors.password && (
                                <div className={styles.errorMessage}>{errors.password}</div>
                            )}
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Lembrar minha senha
                        </label>
                        <button type="button" style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer' }}>
                            Esqueci minha senha?
                        </button>
                    </div>

                    <button className={styles.submitButton} type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner" />
                                Entrando...
                            </>
                        ) : (
                            <>
                                Entrar <FiArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.footer}>
                    © 2025 ERP Pharma. Todos os direitos reservados.
                </div>
            </div>
        </div>
    );
}

export default Login;
