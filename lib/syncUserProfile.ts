import { supabase } from "./supabase";
import type { UserRole } from "../store/useUserStore";

// 登录后首次调用，用于写入 users 表
export async function syncUserProfile(userId: string, role: UserRole = "client") {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!data) {
    await supabase.from("users").insert([{ id: userId, role }]);
  }
}
