import java.util.Scanner;
class ExceptionHandling
{
	public static void main(String args[])
	{	
		Scanner sc = new Scanner(System.in);
		int a[]=new int[5];
		int i, s=0;
		System.out.println("Enter 5 Integers: ");
		for(i=0; i<5; i++)
			a[i] = sc.nextInt();
		try 
		{
			for(i=0; i<6; i++)
			{
				System.out.println(a[i] + " ");
			}
			System.out.println(" = " + s);
		}
		catch(ArrayIndexOutOfBoundsException e)
		{
			System.out.println(e.getMessage());
			System.out.println("Array Index Out of Bound");
		}
		
	} 
}