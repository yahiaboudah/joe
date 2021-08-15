
// Trying to access registry to verify that python is installed on the machine.
// Now I'm using a simple bat file to acheive this verification instead of the
// long and tedious (but faster) C code.

#include <windows.h>
#include <stdio.h>
#define nullptr ((void*)0)

DWORD val;
DWORD dataSize = sizeof(val);
int main(){
  
  printf("data size: %d\n", dataSize);

  char path[] = "S-1-5-21-2659005833-1977627530-1988990359-1001\\SOFTWARE\\Ghost Town Games\\Overcooked";
  char name[] = "Screenmanager Resolution Width_h182942802";
  
  int err = RegGetValueA(HKEY_USERS,
                        path,
                        name,
                        RRF_RT_DWORD, 
                        nullptr /*type not required*/, 
                        &val, 
                        &dataSize);

  if (!err)  printf("Value is %i\n", val);
  else printf("Error number: %d\n", err);
  printf("Required datasize: %d\n", dataSize);
  
  return 0;
}