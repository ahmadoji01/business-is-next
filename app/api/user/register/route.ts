import { NextResponse, NextRequest } from "next/server";
import { directusClient } from "@/utils/request-handler";
import { registerUser } from "@directus/sdk";

export async function POST(request: NextRequest, response: any) {
  try {
    const { first_name, last_name, email, password } = await request.json();
    const result = await directusClient.request(
      registerUser(email, password, {
          first_name,
          last_name,
      })
    );
    return NextResponse.json({ status: "success",
      message: "User created successfully",
      data: result, 
    });
  } catch (e: any) {
    console.log(e);
    const code = e.errors[0].extensions.code
    if (code === 'RECORD_NOT_UNIQUE') {
      return NextResponse.json({ 
        status: "fail",
        message: "User already exists",
      });
    }
    return NextResponse.json({ status: "fail",
      message: "Something went wrong", 
    });
  }
}
