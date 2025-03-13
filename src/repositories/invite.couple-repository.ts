import api from "@/services/api";
import { useAuth } from "@/hooks/use-auth"; // Importando o hook para pegar o usuário autenticado
import Cookies from "js-cookie";
interface InviteResponse {
  invite: Invite;
}

export const inviteRepository = {
  inviteUser: async (data: { inviterId: string; inviteeEmail: string }) => {
    const token = Cookies.get('token'); 

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }
    const response = await api.post("/couple/invite", 
      { email: data.inviteeEmail },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      }
    );

    return response.data.value; 
  }
};



