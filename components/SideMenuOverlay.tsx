import { useNavigate } from "react-router-dom";
import type { User } from "../store/useUserStore"; // ✅ 你已经定义了 User 类型

type Props = {
  currentUser?: User | null;
  onClose: () => void;
};

function SideMenuOverlay({ currentUser, onClose }: Props) {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="overlay-container" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {/* ✅ 显示当前身份 */}
        {currentUser && (
          <div
            style={{
              color: "#fff",
              padding: "1rem",
              textAlign: "center",
              marginTop: "1rem",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 10,
              position: "relative",
              borderBottom: "1px solid #555",
            }}
          >
            当前身份：
            <strong>{currentUser.role === "tasker" ? "服务者" : "用户"}</strong>
          </div>
        )}

        {/* ✅ 菜单按钮区域 */}
        {currentUser ? (
          <>
            <MenuButton text="我的主页" onClick={() => handleNav("/mypage")} delay={0.1} />
            <MenuButton text="我的任务" onClick={() => handleNav("/mytasks")} delay={0.2} />
            <MenuButton text="切换身份" onClick={() => handleNav("/switch-role")} delay={0.3} />
            <MenuButton text="登出" onClick={() => handleNav("/logout")} delay={0.4} />
          </>
        ) : (
          <>
            <MenuButton text="登录 / 注册" onClick={() => handleNav("/login")} delay={0.2} />
          </>
        )}
      </div>
    </div>
  );
}

function MenuButton({
  text,
  onClick,
  delay = 0,
}: {
  text: string;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <button
      className="overlay-button fade-in"
      onClick={onClick}
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "white",
        fontSize: "1.2rem",
        padding: "1rem",
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
        animationDelay: `${delay}s`,
      }}
    >
      {text}
    </button>
  );
}

export default SideMenuOverlay;
